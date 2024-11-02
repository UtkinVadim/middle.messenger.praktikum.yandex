import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus.ts';
import type { PropsAndChildren } from '../types/Block.d.ts';

type BlockEvents = {
  INIT: string,
  FLOW_RENDER: string,
  FLOW_CDM: string,
  FLOW_CDU: string
};

type BaseProp = Record<string, any>;
type ChildrenProp = Record<string, Block>;
type ListProp = Record<string, Array<any>>;

type Meta = { tagName: string, props: BaseProp };

export default abstract class Block {
  public url?: string;

  private static EVENTS: BlockEvents = {
    INIT: 'init',
    FLOW_RENDER: 'flow:render',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
  };

  protected _eventBus: EventBus = new EventBus();

  protected _id: string = makeUUID();

  protected _meta: Meta;

  protected _children: ChildrenProp;

  protected _props: BaseProp;

  protected _lists: ListProp;

  protected _element: HTMLElement | any;

  protected _setUpdate: boolean = true;

  constructor(tagName: string = 'div', propsAndChildren: PropsAndChildren = {}) {
    const {
      children,
      props,
      lists,
    } = Block._getChildren(propsAndChildren);

    this._meta = {
      tagName,
      props,
    };

    this._children = this._makePropsProxy(children);
    this._lists = this._makePropsProxy(lists);
    this._props = this._makePropsProxy({
      ...props,
      __id: this._id,
    });

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  protected _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // INIT
  protected _init(): void {
    this._element = this._createDocumentElement(this._meta.tagName);
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this._props.settings?.withInternalID) {
      element.setAttribute('data-id', this._id);
    }

    return element;
  }

  static _getChildren(propsAndChildren: PropsAndChildren): {
    children: ChildrenProp,
    props: BaseProp,
    lists: ListProp
  } {
    const children: ChildrenProp = {};
    const props: BaseProp = {};
    const lists: ListProp = {};

    Object.keys(propsAndChildren)
      .forEach((key) => {
        if (propsAndChildren[key] instanceof Block) {
          children[key] = propsAndChildren[key];
        } else if (Array.isArray(propsAndChildren[key])) {
          lists[key] = propsAndChildren[key];
        } else {
          props[key] = propsAndChildren[key];
        }
      });

    return {
      children,
      props,
      lists,
    };
  }

  protected _makePropsProxy(props: ChildrenProp | BaseProp | ListProp): ChildrenProp | BaseProp | ListProp | any {
    /* eslint-disable @typescript-eslint/no-this-alias */
    const self: Block = this;

    type Target = ChildrenProp | BaseProp | ListProp;
    type Value = Block | Array<any> | any;

    return new Proxy(props, {
      get(target: Target, prop: string): Value {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Target, prop: string, value: Value): boolean {
        if (target[prop] !== value) {
          /* eslint-disable no-param-reassign */
          target[prop] = value;
          self._setUpdate = true;
        }
        return true;
      },
    });
  }

  // FLOW_CDM
  protected _componentDidMount(): void {
    Block.componentDidMount();
    Object.values(this._children)
      .forEach((child) => {
        child.dispatchComponentDidMount();
      });
  }

  // FLOW_CDU
  protected _componentDidUpdate(oldProps: BaseProp, newProps: BaseProp): void {
    const isReRender = this.componentDidUpdate(oldProps, newProps);
    if (isReRender) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // FLOW_RENDER
  protected _render(): void {
    const block = this.render();

    this._removeEvents();
    this._element.innerHTML = '';

    this._element.appendChild(block);
    this._addAttribute();
    this._addEvents();
  }

  protected _removeEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events)
      .forEach((eventName) => {
        this._element.removeEventListener(eventName, events[eventName]);
      });
  }

  protected _addAttribute(): void {
    const { attr = {} } = this._props;

    Object.entries(attr)
      .forEach(([key, value]) => {
        this._element.setAttribute(key, value);
      });
  }

  protected _addEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events)
      .forEach((eventName) => {
        this._element.addEventListener(eventName, events[eventName]);
      });
  }

  // Public
  public abstract render(): HTMLElement;

  // eslint-disable-next-line
  public componentDidUpdate(oldProps: BaseProp, newProps: BaseProp): boolean {
    // eslint-disable-next-line
    console.log(oldProps, newProps);
    return true;
  }

  static componentDidMount(): void {
  }

  public dispatchComponentDidMount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  compile(template: string, props: PropsAndChildren = this._props) {
    const propsAndStubs = { ...props };

    Object.entries(this._children)
      .forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      });

    Object.keys(this._lists)
      .forEach((key) => {
        propsAndStubs[key] = `<div data-id="__l_${key}"></div>`;
      });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children)
      .forEach((child) => {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      });

    Object.entries(this._lists)
      .forEach(([key, child]) => {
        const stub = fragment.content.querySelector(`[data-id="__l_${key}"]`);

        if (!stub) {
          return;
        }

        const listContent = this._createDocumentElement('template');

        child.forEach((item) => {
          if (item instanceof Block) {
            listContent.content.append(item.getContent());
          } else {
            listContent.content.append(`${item}`);
          }
        });

        stub.replaceWith(listContent.content);
      });

    return fragment.content;
  }

  public getContent(): HTMLElement {
    return this._element;
  }

  public setProps(newProps: PropsAndChildren) {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this._props };

    const {
      children,
      props,
      lists,
    } = Block._getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }
}

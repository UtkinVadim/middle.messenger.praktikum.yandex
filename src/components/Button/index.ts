import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenButton extends PropsAndChildren {
    label: string;
    type?: string;
    link?: Block;
}

export default class Button extends Block {
  constructor(propsAndChildren: IPropsAndChildrenButton, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'blue-button';

    if (props.type) {
      props.attr.type = props.type;
    }

    if (!props.events) {
      props.events = {};
    }

    if (props.link) {
      props.events.click = function redirect(event: PointerEvent) {
        window.page.setProps({ content: props.link });
        event.preventDefault();
        event.stopPropagation();
      };
    }

    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl';
import Block from '../../../services/Block';
import { PropsAndChildren } from '../../../types/Block';

interface IPropsAndChildrenInput extends PropsAndChildren {
    id: string;
    editable: boolean;
    inputType?: string;
}

export default class Input extends Block {
  constructor(tagName: string = 'input', propsAndChildren: IPropsAndChildrenInput) {
    propsAndChildren.attr = {};

    if (propsAndChildren.attr.editable) {
      propsAndChildren.attr.class = 'editable-field';
    }

    propsAndChildren.attr.type = propsAndChildren.inputType ? propsAndChildren.inputType : 'text';
    propsAndChildren.attr.id = propsAndChildren.id;
    propsAndChildren.attr.name = propsAndChildren.id;

    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}

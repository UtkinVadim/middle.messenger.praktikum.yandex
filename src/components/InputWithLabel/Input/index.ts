import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

interface IPropsAndChildrenInput extends PropsAndChildren {
    id: string;
    editable: boolean;
    inputType?: string;
    value?: any;
}

export default class Input extends Block {
  constructor(propsAndChildren: IPropsAndChildrenInput, tagName: string = 'input') {
    const props = { ...propsAndChildren };
    props.attr = {};

    if (props.attr.editable) {
      props.attr.class = 'editable_field';
    }

    props.attr.type = props.inputType ? props.inputType : 'text';
    props.attr.id = props.id;
    props.attr.name = props.id;

    if (props.value) {
      props.attr.value = props.value;
    }

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

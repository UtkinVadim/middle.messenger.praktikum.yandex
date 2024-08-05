import './style.scss';

import tpl from './tpl.ts';
import Input from './Input/index.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenInput extends
    PropsAndChildren {
    label: string;
    input: Input;
}

export default class InputWithLabel extends Block {
  constructor(propsAndChildren: IPropsAndChildrenInput, tagName: string = 'div') {
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}

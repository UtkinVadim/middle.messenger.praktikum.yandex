import './style.scss';

import tpl from './tpl';
import Input from './Input';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

interface IPropsAndChildrenInput extends
    PropsAndChildren {
    label: string;
    input: Input;
}

export default class InputWithLabel extends Block {
  constructor(tagName: string = 'div', propsAndChildren: IPropsAndChildrenInput) {
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}

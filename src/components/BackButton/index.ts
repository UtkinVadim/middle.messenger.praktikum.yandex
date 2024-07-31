import './style.scss';

import tpl from './tpl';
import Block from '../../services/Block';
import { PropsAndChildren } from '../../types/Block';

export default class BackButton extends Block {
  constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
    if (!propsAndChildren.attr) {
      propsAndChildren.attr = {};
    }

    propsAndChildren.attr.class = 'back-button';
    propsAndChildren.attr.onclick = "location.href='/';";

    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}

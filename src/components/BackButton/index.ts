import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class BackButton extends Block {
  constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'back-button';
    props.attr.onclick = "location.href='/';";

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

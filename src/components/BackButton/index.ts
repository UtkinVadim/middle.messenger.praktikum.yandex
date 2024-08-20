import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import router from '../../index.ts';

export default class BackButton extends Block {
  constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'back-button';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function redirect(event: PointerEvent) {
      router.back();
      event.preventDefault();
      event.stopPropagation();
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

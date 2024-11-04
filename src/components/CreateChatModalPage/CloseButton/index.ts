import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

export default class CloseButton extends Block {
  constructor(propsAndChildren: PropsAndChildren = {}, tagName: string = 'span') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'create_chat_modal_page__close';
    props.attr.id = 'create_chat_modal_page__close';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      const modal = document.getElementById('create_chat_modal_page') as HTMLElement;
      modal.style.display = 'none';
    };

    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class CreateChatButton extends Block {
  constructor(propsAndChildren: PropsAndChildren, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      const modal = document.getElementById('create_chat_modal_page') as HTMLElement;

      modal.style.display = 'block';
    };
    super(tagName, props);
  }

  public render() {
    return this.compile(tpl);
  }
}

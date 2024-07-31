import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import ChatMessage from '../ChatMessage/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

export default class SendButton extends Block {
  constructor(tagName: string = 'button', propsAndChildren: PropsAndChildren = {}) {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'send-button';
    props.attr.type = 'submit';

    super(tagName, props);

    this.setProps({
      events: {
        click(event: PointerEvent) {
          event.preventDefault();
          event.stopPropagation();

          const messageInput: HTMLInputElement = document.querySelector('#message') as HTMLInputElement;
          const message: string = messageInput.value;

          if (!message || !message.trim()) {
            return;
          }

          const newMessage = new ChatMessage({
            text: message,
            type: 'sent',
          });

          const messages = document.querySelector('.chat__messages');

          if (!messages) {
            return;
          }

          messages.append(newMessage.getContent());
          messageInput.value = '';
        },
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}

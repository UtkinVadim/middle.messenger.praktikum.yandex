import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import ChatWebsocketController from '../../controllers/ChatWebsocketController.ts';

interface IPropsAndChildrenSendButton extends PropsAndChildren {
  chatId: number;
  wsController: ChatWebsocketController;
}

export default class SendButton extends Block {
  constructor(propsAndChildren: IPropsAndChildrenSendButton, tagName: string = 'button') {
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

          props.wsController.sendMessage(message);
        },
      },
    });
  }

  render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import ChatController from '../../../controllers/ChatController.ts';


interface IPropsAndChildrenDeleteChatButton extends PropsAndChildren {
  chatId : number;
}

export default class DeleteChatButton extends Block {
  constructor(propsAndChildren: IPropsAndChildrenDeleteChatButton, tagName: string = 'button') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat-card__delete-btn';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      ChatController.deleteChat(props.chatId);
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

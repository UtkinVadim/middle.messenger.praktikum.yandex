import './style.scss';

import tpl from './tpl.ts';
import router from '../../index.ts';
import Block from '../../services/Block.ts';
import Chat from '../../pages/Chat/index.ts';
import ChatCardMessage from './Message/index.ts';
import DeleteChatButton from './DeleteChatButton';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenChatCard extends PropsAndChildren {
  id : number;
  title: string;
  last_message?: ChatCardMessage;
  unread_count?: number;
  deleteChatButton?: DeleteChatButton
}

export default class ChatCard extends Block {
  constructor(propsAndChildren: IPropsAndChildrenChatCard, tagName: string = 'div') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card';

    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      const path = Chat.url + '/' + props.id;
      router.go(path);
    };

    props.deleteChatButton = new DeleteChatButton({ chatId: props.id });

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

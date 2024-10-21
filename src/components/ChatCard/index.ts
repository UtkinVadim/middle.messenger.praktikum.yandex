import './style.scss';

import tpl from './tpl.ts';
import router from '../../index.ts';
import Users from './Users/index.ts';
import AddUser from './AddUser/index.ts';
import Block from '../../services/Block.ts';
import Chat from '../../pages/Chat/index.ts';
import DeleteChatButton from './DeleteChatButton';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenChatCard extends PropsAndChildren {
  id : number;
  title: string;
  users?: Users;
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

    const chatIdProp = { chatId: props.id };
    props.deleteChatButton = new DeleteChatButton(chatIdProp);
    props.users = new Users(chatIdProp);
    props.addUser = new AddUser(chatIdProp);

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl.ts';
import User from './User/index.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import activeChatController from '../../../controllers/ActiveChatController.ts';

interface IPropsAndChildrenUsers extends PropsAndChildren {
  chatId: number;
  users: Array<User>;
}

export default class Users extends Block {
  constructor(propsAndChildren: IPropsAndChildrenUsers, tagName: string = 'div') {
    const props = { ...propsAndChildren };

    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card__users';

    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
    };

    props.users = [];

    activeChatController.getChatUsers(props.chatId)
      .then((chatUsers) => {
        props.users = chatUsers.map(userData => new User({ userData: userData }));
      });

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

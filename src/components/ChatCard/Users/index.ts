import './style.scss';

import tpl from './tpl.ts';
import User from './User/index.ts';
import store, { StoreEvents } from '../../../services/Store.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import chatCardController from '../../../controllers/ChatCardController.ts';

interface IPropsAndChildrenUsers extends PropsAndChildren {
  chatId: number;
  users?: Array<User>;
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

    super(tagName, props);

    this._updateChatUsers();

    const event = `${StoreEvents.UserListUpdated}_${props.chatId}`;
    store.on(event, () => {
      this._updateChatUsers();
    });
  }

  render() {
    return this.compile(tpl);
  }

  private async _updateChatUsers(): Promise<void> {
    const chatId: number = this._props.chatId;

    const chatUsers = await chatCardController.getChatUsers(chatId);
    const users = chatUsers.reverse().map(userData => new User({
      userData: userData,
      chatId: chatId
    }));
    this.setProps({ users: users });
  }
}

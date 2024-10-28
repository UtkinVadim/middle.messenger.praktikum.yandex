import './style.scss';

import tpl from './tpl.ts';
import User from './User/index.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';
import chatCardController from '../../../controllers/ChatCardController.ts';

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

    super(tagName, props);

    chatCardController.getChatUsers(props.chatId)
      .then((chatUsers) => {
          const users = chatUsers.map(userData => new User({ userData: userData }));
          this.setProps({ users: users });
        }
      );
  }

  render() {
    return this.compile(tpl);
  }
}

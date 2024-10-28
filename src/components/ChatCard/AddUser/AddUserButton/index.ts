import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../../services/Block.ts';
import type { PropsAndChildren } from '../../../../types/Block.d.ts';
import chatCardController from '../../../../controllers/ChatCardController.ts';

interface IPropsAndChildrenAddUserButton extends PropsAndChildren {
  chatId: number;
}

export default class AddUserButton extends Block {
  constructor(propsAndChildren: IPropsAndChildrenAddUserButton, tagName: string = 'button') {
    const props = { ...propsAndChildren };

    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat-card__add_user_button';

    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      const formElement = document.getElementById(`add_user_form_${props.chatId}`) as HTMLFormElement;
      const formData = new FormData(formElement);
      const userId = Number(formData.get('user_id'));

      if (!userId) {
        throw new Error('User id must be a number');
      }

      chatCardController.addUserToChat(userId, props.chatId);
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../../../services/Block.ts';
import type { PropsAndChildren } from '../../../../../types/Block.d.ts';
import chatCardController from '../../../../../controllers/ChatCardController.ts';

interface IPropsAndChildrenRemoveUserButton extends PropsAndChildren {
  chatId: number;
  userId: number;
}

export default class RemoveUserButton extends Block {
  constructor(propsAndChildren: IPropsAndChildrenRemoveUserButton, tagName: string = 'img') {
    const props = { ...propsAndChildren };

    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card__users__remove_user';
    props.attr.src = '/trash.svg';
    props.attr.alt = 'Remove user';

    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();

      chatCardController.removeUserFromChat(props.userId, props.chatId);
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

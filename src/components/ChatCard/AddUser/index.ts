import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

interface IPropsAndChildrenAddUser extends PropsAndChildren {
  chatId: number;
}

export default class AddUser extends Block {
  constructor(propsAndChildren: IPropsAndChildrenAddUser, tagName: string = 'div') {
    const props = { ...propsAndChildren };

    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card__users-add-user';

    if (!props.events) {
      props.events = {};
    }

    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

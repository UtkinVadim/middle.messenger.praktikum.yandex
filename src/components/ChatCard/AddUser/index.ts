import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

interface IPropsAndChildrenAddUser extends PropsAndChildren {
    chatId: number;
}

export default class AddUser extends Block {
  constructor(propsAndChildren: IPropsAndChildrenAddUser, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      attr: {class: 'chat_card__users-add-user'}
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

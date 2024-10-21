import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

interface IPropsAndChildrenUsers extends PropsAndChildren {
    chatId: number;
}

export default class Users extends Block {
  constructor(propsAndChildren: IPropsAndChildrenUsers, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      attr: {class: 'chat_card__users'}
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

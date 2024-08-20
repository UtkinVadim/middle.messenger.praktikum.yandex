import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import ChatCard from '../../components/ChatCard/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenLastChats extends
    PropsAndChildren {
    chat_cards: Array<ChatCard>;
}

export default class LastChats extends Block {
  public url: string = '/last_chats';

  constructor(propsAndChildren: IPropsAndChildrenLastChats, tagName: string = 'main') {
    super(tagName, propsAndChildren);
  }

  render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl.ts';
import ChatCardMessage from './Message/index.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenChatCard extends PropsAndChildren {
    companion: string;
    lastMessages: Array<ChatCardMessage>;
    newMessagesCount?: number;
}

export default class ChatCard extends Block {
  constructor(propsAndChildren: IPropsAndChildrenChatCard, tagName: string = 'div') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card';

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

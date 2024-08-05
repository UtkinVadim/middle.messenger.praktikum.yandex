import './style.scss';

import tpl from './tpl.ts';
import Block from '../../../services/Block.ts';
import type { PropsAndChildren } from '../../../types/Block.d.ts';

interface IPropsAndChildrenChatCardMessage extends PropsAndChildren {
    text: string;
}

export default class ChatCardMessage extends Block {
  constructor(propsAndChildren: IPropsAndChildrenChatCardMessage, tagName: string = 'p') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card__last_messages__message_text';

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

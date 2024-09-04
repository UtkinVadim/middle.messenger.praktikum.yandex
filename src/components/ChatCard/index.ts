import './style.scss';

import tpl from './tpl.ts';
import ChatCardMessage from './Message/index.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';

interface IPropsAndChildrenChatCard extends PropsAndChildren {
  title: string;
  last_message?: ChatCardMessage;
  unread_count?: number;
}

export default class ChatCard extends Block {
  constructor(propsAndChildren: IPropsAndChildrenChatCard, tagName: string = 'div') {
    const props = { ...propsAndChildren };
    if (!props.attr) {
      props.attr = {};
    }

    props.attr.class = 'chat_card';

    if (!props.events) {
      props.events = {};
    }
    props.events.click = function onClick(event: PointerEvent) {
      event.preventDefault();
      event.stopPropagation();
      console.log('Click on chat card');
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

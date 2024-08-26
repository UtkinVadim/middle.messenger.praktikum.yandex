import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import BackButton from '../../components/BackButton/index.ts';
import SendButton from '../../components/SendButton/index.ts';
import ChatMessage from '../../components/ChatMessage/index.ts';

interface IPropsAndChildrenChat extends PropsAndChildren {
    messages?: Array<ChatMessage>;
}

export default class Chat extends Block {
  public static url: string = '/chat';

  constructor(propsAndChildren: IPropsAndChildrenChat = {}, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      sendButton: new SendButton(),
      backButton: new BackButton(),
      attr: {
        class: 'chat',
      },
    };

    super(tagName, props);
  }

  render() {
    return this.compile(tpl);
  }
}

import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import BackButton from '../../components/BackButton/index.ts';
import SendButton from '../../components/SendButton/index.ts';
import ChatMessage from '../../components/ChatMessage/index.ts';
import LastChats from '../LastChats/index.ts';
import store, { StoreEvents } from '../../services/Store.ts';

interface IPropsAndChildrenChat extends PropsAndChildren {
  chatId: number;
  title: string;
  messages?: Array<ChatMessage>;
}

export default class Chat extends Block {
  public static url: string = '/chat';

  constructor(propsAndChildren: IPropsAndChildrenChat, tagName: string = 'div') {
    const props = {
      ...propsAndChildren,
      sendButton: new SendButton({ chatId: propsAndChildren.chatId }),
      backButton: new BackButton({ backUrl: LastChats.url }),
      messages: store.getChatHistory(propsAndChildren.chatId).messages,
      attr: {
        class: 'chat',
      },
    };

    super(tagName, props);

    const event = `${StoreEvents.ChatMessagesUpdated}_${props.chatId}`;
    store.on(event, () => {
      this._updateChatMessages();
    });
  }

  render() {
    return this.compile(tpl);
  }

  private _updateChatMessages() {
    this.setProps({messages: store.getChatHistory(this._props.chatId).messages});
  }
}

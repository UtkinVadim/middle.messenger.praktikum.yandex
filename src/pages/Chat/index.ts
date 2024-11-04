import './style.scss';

import tpl from './tpl.ts';
import Block from '../../services/Block.ts';
import LastChats from '../LastChats/index.ts';
import type { MessageData } from '../../types/Chat.d.ts';
import store, { StoreEvents } from '../../services/Store.ts';
import SendButton from '../../components/SendButton/index.ts';
import BackButton from '../../components/BackButton/index.ts';
import type { PropsAndChildren } from '../../types/Block.d.ts';
import ChatMessage from '../../components/ChatMessage/index.ts';

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
      messages: Chat._getMessagesFromHistory(propsAndChildren.chatId),
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

  private static _getMessagesFromHistory(chatId: number) {
    const messagesData = store.getChatHistory(chatId).messages;
    return messagesData.map((messageData: MessageData) => new ChatMessage(messageData));
  }

  private _updateChatMessages() {
    this.setProps({messages: Chat._getMessagesFromHistory(this._props.chatId)});
  }
}

import EventBus from './EventBus.ts';
import type { Indexed } from '../types/common.d.ts';
import type { MessageData } from '../types/Chat.d.ts';
import ChatCard from '../components/ChatCard/index.ts';
import type { userInfoData } from '../types/api/AuthApi.d.ts';

// eslint-disable-next-line no-shadow
export enum StoreEvents {
  ChatsUpdated = 'chatsUpdated',
  UserInfoUpdated = 'userInfoUpdated',
  AvatarUpdated = 'avatarUpdated',
  UserListUpdated = 'userListUpdated',
  ChatMessagesUpdated = 'chatMessagesUpdated'
}

interface ChatHistory {
  chatId: number;
  messages: Array<MessageData>;
}

interface StoreData extends Indexed {
  chats: Array<ChatCard>;
  userInfo: userInfoData;
  chatsHistory: Array<ChatHistory>;
}

class Store extends EventBus {
  private _state: StoreData = this._loadState() || {
    chats: [],
    userInfo: {
      id: 0,
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      login: '',
      avatar: null,
      email: '',
    },
    chatsHistory: []
  };

  public getState(): StoreData {
    return this._state;
  }

  public setChats(chats: Array<ChatCard>): void {
    this._state.chats = chats;
    this.emit(StoreEvents.ChatsUpdated);
  }

  public addChat(chatCard: ChatCard): void {
    this._state.chats.push(chatCard);
    this.emit(StoreEvents.ChatsUpdated);
  }

  public updateUserInfo(userInfo: userInfoData): void {
    this._state.userInfo = userInfo;
    if (this.eventExist(StoreEvents.UserInfoUpdated)) {
      this.emit(StoreEvents.UserInfoUpdated);
    }
  }

  public updateUserAvatar(path: string): void {
    this._state.userInfo.avatar = path;
    this.emit(StoreEvents.AvatarUpdated);
  }

  public updateUserList(chatId: string): void {
    const event = `${StoreEvents.UserListUpdated}_${chatId}`;
    this.emit(event);
  }

  public saveMessageInHistory(chatId: number, message: MessageData): void {
    const chatHistory = this.getChatHistory(chatId);
    chatHistory.messages.push(message);
    this._saveState();
    const event = `${StoreEvents.ChatMessagesUpdated}_${chatId}`;
    this.emit(event);
  }

  public getChatHistory(chatId: number): ChatHistory {
    let chatHistory;
    chatHistory = this._state.chatsHistory.find(chat => chat.chatId === chatId);
    if (!chatHistory) {
      chatHistory = {
        chatId: chatId,
        messages: []
      };
      this._state.chatsHistory.push(chatHistory);
      this._saveState();
    }
    return chatHistory;
  }

  private _saveState(): void {
    localStorage.setItem('storeState', JSON.stringify(this._state));
  }

  private _loadState(): StoreData | null {
    const state = localStorage.getItem('storeState');
    return state ? JSON.parse(state) : null;
  }
}

export default new Store();

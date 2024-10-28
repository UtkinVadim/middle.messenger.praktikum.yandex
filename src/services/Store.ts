import EventBus from './EventBus.ts';
import ChatCard from '../components/ChatCard';
import { userInfo } from '../types/api/AuthApi';
import type { Indexed } from '../types/common.d.ts';

export enum StoreEvents {
  ChatsUpdated = 'chatsUpdated',
  UserInfoUpdated = 'userInfoUpdated',
  AvatarUpdated = 'avatarUpdated',
  UserListUpdated = 'userListUpdated',
}

interface StoreData extends Indexed {
  chats: Array<ChatCard>;
  userInfo: userInfo;
}

class Store extends EventBus {
  private _state: StoreData = {
    chats: [],
    userInfo: {
      id: 0,
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      login: '',
      avatar: null,
      email: ''
    }
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

  public updateUserInfo(userInfo: userInfo): void {
    this._state.userInfo = userInfo;
    this.emit(StoreEvents.UserInfoUpdated);
  }

  public updateUserAvatar(path: string): void {
    this._state.userInfo.avatar = path;
    this.emit(StoreEvents.AvatarUpdated);
  }

  public updateUserList(chatId: string): void {
    const event = `${StoreEvents.UserListUpdated}_${chatId}`;
    this.emit(event);
  }
}

export default new Store();

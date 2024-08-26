import set from '../utils/set.ts';
import EventBus from './EventBus.ts';
import ChatCard from '../components/ChatCard';
import type { Indexed } from '../types/common.d.ts';

export enum StoreEvents {
  ChatsUpdated = 'chatsUpdated',
}


interface StoreData extends Indexed {
  chats: Array<ChatCard>;
}


class Store extends EventBus {
  private _state: StoreData = {
    chats: [],
  };

  public getState(): StoreData {
    return this._state;
  }

  public set(path: string, value: unknown): void {
    set(this._state, path, value);
  };

  public addChat(chatCard: ChatCard): void {
    this._state.chats.push(chatCard);
    this.emit(StoreEvents.ChatsUpdated);
  }
}


export default new Store();

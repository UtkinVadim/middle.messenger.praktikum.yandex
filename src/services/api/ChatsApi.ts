import BaseAPI from './BaseApi.ts';
import type { GetChatsData, CreateChatData } from '../../types/api/ChatsApi.d.ts';

class ChatsApi extends BaseAPI {
  public async getChats(data: GetChatsData = {
    limit: 8,
    offset: 0
  }): Promise<XMLHttpRequest> {
    const path = '/chats';
    return await this._get(path, data);
  }

  public async createChat(data: CreateChatData): Promise<XMLHttpRequest> {
    const path = '/chats';
    return await this._post(path, data);
  }
}

export default new ChatsApi();

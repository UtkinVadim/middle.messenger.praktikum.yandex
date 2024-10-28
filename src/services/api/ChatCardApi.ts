import BaseAPI from './BaseApi.ts';

import type { addUserToChatData } from '../../types/api/ChatCardApi.d.ts';

class ChatCardApi extends BaseAPI {
  public async getChatUsers(chatId: string): Promise<XMLHttpRequest> {
    const path = `/chats/${chatId}/users`;
    return await this._get(path);
  }

  public async addUserToChat(data: addUserToChatData): Promise<XMLHttpRequest> {
    const path = `/chats/users`;
    return await this._put(path, data);
  }

}

export default new ChatCardApi();

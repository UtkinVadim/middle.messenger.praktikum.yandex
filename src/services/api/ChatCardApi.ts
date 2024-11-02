import BaseAPI from './BaseApi.ts';

import type { chatCardUserActionData } from '../../types/api/ChatCardApi.d.ts';

class ChatCardApi extends BaseAPI {
  public async getChatUsers(chatId: string): Promise<XMLHttpRequest> {
    const path = `/chats/${chatId}/users`;
    return this._get(path);
  }

  public async addUserToChat(data: chatCardUserActionData): Promise<XMLHttpRequest> {
    const path = '/chats/users';
    return this._put(path, data);
  }

  public async removeUserFromChat(data: chatCardUserActionData): Promise<XMLHttpRequest> {
    const path = '/chats/users';
    return this._delete(path, data);
  }
}

export default new ChatCardApi();

import BaseAPI from './BaseApi.ts';

class ActiveChatApi extends BaseAPI {
  public async getChatUsers(chatId: string): Promise<XMLHttpRequest> {
    const path = `/chats/${chatId}/users`;
    return await this._get(path);
  }

}

export default new ActiveChatApi();

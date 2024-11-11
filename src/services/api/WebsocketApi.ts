import BaseAPI from './BaseApi.ts';

class WebsocketApi extends BaseAPI {
  public async getToken(chatId: number): Promise<XMLHttpRequest> {
    const path = `/chats/token/${chatId}`;
    return this._post(path);
  }
}

export default new WebsocketApi();

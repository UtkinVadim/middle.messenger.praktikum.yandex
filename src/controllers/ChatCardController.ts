import ChatCardApi from '../services/api/ChatCardApi.ts';
import type { userData } from '../types/api/ChatCardApi.d.ts'

class ChatCardController {
  public async getChatUsers(chatId: number): Promise<Array<userData>> {
    const xhr = await ChatCardApi.getChatUsers(String(chatId));
    if (xhr.status !== 200) {
      throw new Error('Failed to get chat users');
    }

    return JSON.parse(xhr.response);
  }
}

export default new ChatCardController();

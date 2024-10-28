import ChatCardApi from '../services/api/ChatCardApi.ts';
import type { userData } from '../types/api/ChatCardApi.d.ts';

class ChatCardController {
  public async getChatUsers(chatId: number): Promise<Array<userData>> {
    const xhr = await ChatCardApi.getChatUsers(String(chatId));
    if (xhr.status !== 200) {
      throw new Error('Failed to get chat users');
    }
    return JSON.parse(xhr.response);
  }

  public async addUserToChat(userId: number, chatId: number): Promise<void> {
    const data = {
      users: [userId],
      chatId: String(chatId)
    };
    const xhr = await ChatCardApi.addUserToChat(data);
    if (xhr.status !== 200) {
      throw new Error('Failed to add user in chat');
    }
  }
}

export default new ChatCardController();

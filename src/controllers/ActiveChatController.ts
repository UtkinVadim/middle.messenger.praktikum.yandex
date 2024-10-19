import ActiveChatApi from '../services/api/ActiveChatApi.ts';
import type { userData } from '../types/api/ActiveChatApi.d.ts'

class ActiveChatController {
  public async getChatUsers(chatId: number): Promise<Array<userData>> {
    const xhr = await ActiveChatApi.getChatUsers(String(chatId));
    if (xhr.status !== 200) {
      throw new Error('Failed to get chat users');
    }

    return JSON.parse(xhr.response);
  }
}

export default new ActiveChatController();

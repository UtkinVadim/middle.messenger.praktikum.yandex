import store from '../services/Store.ts';
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
    try {
      const chatIdAsString = String(chatId);
      const data = {
        users: [userId],
        chatId: chatIdAsString,
      };
      const xhr = await ChatCardApi.addUserToChat(data);
      if (xhr.status !== 200) {
        throw new Error('Failed to add user in chat.');
      }

      store.updateUserList(chatIdAsString);
    } catch (error) {
      console.error('Error in addUserToChat:', error);
      throw error;
    }
  }

  public async removeUserFromChat(userId: number, chatId: number): Promise<void> {
    try {
      const chatIdAsString = String(chatId);
      const data = {
        users: [userId],
        chatId: chatIdAsString,
      };
      const xhr = await ChatCardApi.removeUserFromChat(data);
      if (xhr.status !== 200) {
        throw new Error('Failed to remove user from.');
      }

      store.updateUserList(chatIdAsString);
    } catch (error) {
      console.error('Error in removeUserFromChat:', error);
      throw error;
    }
  }
}

export default new ChatCardController();

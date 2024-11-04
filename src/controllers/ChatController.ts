import router from '../index.ts';
import store from '../services/Store.ts';
import Chat from '../pages/Chat/index.ts';
import chatsApi from '../services/api/ChatsApi.ts';
import ChatCard from '../components/ChatCard/index.ts';

class ChatController {
  public async createChat(title: string): Promise<void> {
    try {
      const requestData = { title };
      const xhr = await chatsApi.createChat(requestData);
      if (xhr.status !== 200) {
        throw new Error(xhr.response);
      }

      const chatId = JSON.parse(xhr.response).id;

      this._addChatUrl(title, chatId);

      const chatCard = new ChatCard({
        id: chatId,
        title,
      });
      store.addChat(chatCard);
    } catch (error) {
      console.error('Error in createChat:', error);
      throw error;
    }
  }

  public async deleteChat(chatId: number): Promise<void> {
    try {
      const requestData = { chatId };
      const xhr = await chatsApi.deleteChat(requestData);
      if (xhr.status === 200) {
        this.refreshChats();
      }
    } catch (error) {
      console.error('Error in deleteChat:', error);
      throw error;
    }
  }

  public async refreshChats() {
    try {
      const xhr = await chatsApi.getChats();
      if (xhr.status !== 200) {
        throw new Error('Getting chats error');
      }
      const response = JSON.parse(xhr.response);

      const chatCards = response.map((chatData: any) => {
        const chatCard = new ChatCard(chatData);
        this._addChatUrl(chatData.title, chatData.id);
        return chatCard;
      });

      store.setChats(chatCards);
    } catch (error) {
      console.error('Error in refreshChats:', error);
      throw error;
    }
  }

  private _addChatUrl(title: string, chatId: number): void {
    const newChatUrl = `${Chat.url}/${chatId}`;
    const newChat = new Chat({
      chatId,
      title,
    });
    router.use(newChatUrl, newChat);
  }
}

export default new ChatController();

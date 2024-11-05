import store from '../services/Store.ts';
import Chat from '../pages/Chat/index.ts';
import Router from '../services/Router.ts';
import BaseController from './BaseController.ts';
import chatsApi from '../services/api/ChatsApi.ts';
import ChatCard from '../components/ChatCard/index.ts';

class ChatController extends BaseController {
  public async createChat(title: string): Promise<void> {
    try {
      const requestData = { title };
      const xhr = await chatsApi.createChat(requestData);
      this._checkResponse(xhr, xhr.response);

      const chatId = JSON.parse(xhr.response).id;

      const routerObject = this._getRouterObject(null);
      this._addChatUrl(title, chatId, routerObject);

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

  public async refreshChats(router: Router | null = null) {
    try {
      const xhr = await chatsApi.getChats();
      this._checkResponse(xhr, 'Getting chats error');
      const response = JSON.parse(xhr.response);

      const routerObject = this._getRouterObject(router);
      const chatCards = response.map((chatData: any) => {
        const chatCard = new ChatCard(chatData);
        this._addChatUrl(chatData.title, chatData.id, routerObject);
        return chatCard;
      });

      store.setChats(chatCards);
    } catch (error) {
      console.error('Error in refreshChats:', error);
      throw error;
    }
  }

  private _addChatUrl(title: string, chatId: number, routerObject: Router): void {
    const newChatUrl = `${Chat.url}/${chatId}`;
    const newChat = new Chat({
      chatId,
      title,
    });
    routerObject.use(newChatUrl, newChat);
  }
}

export default new ChatController();

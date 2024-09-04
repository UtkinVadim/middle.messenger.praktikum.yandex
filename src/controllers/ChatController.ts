import router from '../index.ts';
import store from '../services/Store.ts';
import Chat from '../pages/Chat/index.ts';
import ChatCard from '../components/ChatCard';
import ChatsApi from '../services/api/ChatsApi.ts';
import chatsApi from '../services/api/ChatsApi.ts';

class ChatController {
  public async createChat(title: string = 'New chat'): Promise<void> {
    const requestData = { title: title };
    const xhr = await ChatsApi.createChat(requestData);
    if (xhr.status !== 200) {
      throw new Error(xhr.response);
    }

    const chatId = JSON.parse(xhr.response).id;

    this._addChatUrl(title, chatId);

    const chatCard = new ChatCard({id: chatId, title: title});
    store.addChat(chatCard);
  }

  public async deleteChat(chatId: number): Promise<void> {
    const requestData = { chatId: chatId };
    const xhr = await ChatsApi.deleteChat(requestData);
    if (xhr.status === 200) {
      this.refreshChats();
    }
  }

  public async refreshChats() {
    const xhr = await chatsApi.getChats();
    if (xhr.status !== 200) {
      throw new Error('Getting chats error');
    }
    const response = JSON.parse(xhr.response);

    const chatCards = [];
    for (const chatData of response) {
      const chatCard = new ChatCard(chatData);
      this._addChatUrl(chatData.title, chatData.id);
      chatCards.push(chatCard);
    }

    store.setChats(chatCards);
  }

  private _addChatUrl(title: string, chatId: number): void {
    console.log(title)
    console.log(chatId)
    const newChatUrl = Chat.url + '/' + chatId;
    const newChat = new Chat({chatId: chatId, title: title});
    router.use(newChatUrl, newChat);
  }
}

export default new ChatController();

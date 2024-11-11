import store from '../services/Store.ts';
import WebsocketApi from '../services/api/WebsocketApi.ts';
import WebSocketTransport from '../services/WebSocketTransport.ts';
import type { MessageData as WsMessageData } from '../types/WebSocketResponseData.d.ts';

export default class ChatWebsocketController {
  protected wsTransport: WebSocketTransport;

  constructor(wsTransport: WebSocketTransport) {
    this.wsTransport = wsTransport;
  }

  static async connectToWebsocket(chatId: number): Promise<WebSocketTransport> {
    const getTokenResult = await WebsocketApi.getToken(chatId);
    const { token } = JSON.parse(getTokenResult.response);
    const userId = store.getState().userInfo.id;

    const wsTransport = new WebSocketTransport(userId, chatId, token);

    wsTransport.socket.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === 'message') {
        const data: WsMessageData = eventData;
        const messageData = {
          text: data.content,
          type: 'sent',
        };
        store.saveMessageInHistory(chatId, messageData);
      } else if (Array.isArray(eventData)) {
        store.setChatHistory(chatId, eventData);
      } else if (eventData.type !== 'pong') {
        throw new Error(`Unresolved message type: ${eventData.type}`);
      }
    });

    await new Promise((resolve, reject) => {
      wsTransport.socket.onopen = () => {
        resolve(true);
      };
      wsTransport.socket.onerror = (error) => {
        reject(error);
      };
    });

    return wsTransport;
  }

  public getMessages(offset: number = 0) {
    const data = {
      content: String(offset),
      type: 'get old',
    };
    this.wsTransport.send(JSON.stringify(data));
  }

  public sendMessage(text: string) {
    const data = {
      content: text,
      type: 'message',
    };
    this.wsTransport.send(JSON.stringify(data));
  }
}

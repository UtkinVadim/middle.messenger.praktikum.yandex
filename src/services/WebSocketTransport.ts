const socket = new WebSocket('wss://ws.postman-echo.com/raw');

export default class WebSocketTransport {
  constructor() {
    socket.addEventListener('message', WebSocketTransport._handleMessage);
  }

  private static _handleMessage(event: MessageEvent): void {
    // eslint-disable-next-line
    console.log('Сообщение от сервера:', event.data);
  }

  public static send(message: string): void {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
}

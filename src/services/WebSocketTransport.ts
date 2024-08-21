const socket = new WebSocket('wss://ws.postman-echo.com/raw');

export default class WebSocketTransport {
  constructor() {
    socket.addEventListener('message', this._handleMessage);
  }

  private _handleMessage(event: MessageEvent): void {
    console.log('Сообщение от сервера:', event.data);
  }

  public send(message: string): void {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }
}

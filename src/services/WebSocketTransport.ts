export default class WebSocketTransport {
  protected _base_url: string = 'wss://ya-praktikum.tech/ws/chats';

  public socket: WebSocket;

  constructor(userId: number, chatId: number, token: string) {
    this.socket = new WebSocket(`${this._base_url}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener('open', () => {
      setInterval(this._ping.bind(this), 10000);
    });
  }

  private _ping() {
    const data = JSON.stringify({ type: 'ping' });
    this.socket.send(data);
  }

  public send(data: string) {
    this.socket.send(data);
  }
}

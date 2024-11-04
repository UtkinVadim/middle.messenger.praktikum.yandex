type callbackFunction = (...args: any[]) => void;

export default class EventBus {
  protected _listeners: Record<string, Array<callbackFunction>> = {};

  on(event: string, callback: callbackFunction): void {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  off(event: string, callback: callbackFunction): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this._listeners[event].forEach((listener): void => {
      listener(...args);
    });
  }

  eventExist(event: string): Boolean {
    return Boolean(this._listeners[event]);
  }
}

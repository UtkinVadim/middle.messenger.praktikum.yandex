import HTTPTransport from '../HTTPTransport.ts';
import type { MethodOptions } from '../../types/HTTPTransport.d.ts';

type RequestData = Record<string, any> | null;

const http: HTTPTransport = new HTTPTransport();

export default abstract class BaseAPI {
  protected _baseUrl: string = 'https://ya-praktikum.tech/api/v2';

  protected static _getOptions(data: RequestData = null): MethodOptions {
    const options: MethodOptions = {
      credentials: 'include',
      mode: 'cors',
    };
    if (data) {
      options.data = data;
    }
    return options;
  }

  protected _get(path: string, data: RequestData = null): Promise<XMLHttpRequest> {
    const url = this._baseUrl + path;
    const options = BaseAPI._getOptions(data);
    return http.get(url, options);
  }

  protected _post(path: string, data: RequestData = null) {
    const url = this._baseUrl + path;
    const options = BaseAPI._getOptions(data);
    return http.post(url, options);
  }

  protected _put(path: string, data: RequestData = null) {
    const url = this._baseUrl + path;
    const options = BaseAPI._getOptions(data);
    return http.put(url, options);
  }

  protected _delete(path: string, data: RequestData = null) {
    const url = this._baseUrl + path;
    const options = BaseAPI._getOptions(data);
    return http.delete(url, options);
  }
}

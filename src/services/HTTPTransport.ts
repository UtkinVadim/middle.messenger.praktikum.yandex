import type { MethodOptions, RequestOptions } from '../types/HTTPTransport.d.ts';

type Methods = {
  GET: string,
  PUT: string,
  POST: string,
  DELETE: string
};

const METHODS: Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

type HTTPMethod = (url: string, options?: MethodOptions) => Promise<XMLHttpRequest>

export default class HTTPTransport {

  public static queryStringify(data: Record<string, string>): string {
    const filtersList: Array<string> = [];

    Object.entries(data)
      .forEach(([filterKey, filterValue]) => {
        let value;

        if (Array.isArray(filterValue)) {
          value = filterValue.join(',');
        } else if (typeof filterValue === 'object') {
          value = filterValue;
        } else {
          value = filterValue;
        }

        filtersList.push(`${filterKey}=${value}`);
      });

    return '?' + filtersList.join('&');
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.GET
    }, options.timeout);
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.PUT
    }, options.timeout);
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.POST
    }, options.timeout);
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, {
      ...options,
      method: METHODS.DELETE
    }, options.timeout);
  };

  request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const {
      headers = {},
      method,
      data
    } = options;

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${HTTPTransport.queryStringify(data)}`
          : url,
      );

      Object.keys(headers)
        .forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data)
      } else {
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

type Methods = {
    GET: string,
    PUT: string,
    POST: string,
    DELETE: string
};

type Options = {
    method: string;
    timeout?: number;
    headers?: Record<string, string>;
    data?: Record<string, string> | string;
}

const METHODS: Methods = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

export default class HTTPTransport {

    public queryStringify(data: Record<string, string>): string {
        const filtersList: Array<string> = [];

        Object.entries(data).forEach(([filterKey, filterValue]) => {
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

    get = (url: string, options: Options = {method: METHODS.GET}) => {
        if (typeof options.data === 'object') {
            options.data = this.queryStringify(options.data);
        }

        return this.request(url, {...options}, options.timeout);
    };

    put = (url: string, options: Options = {method: METHODS.PUT}) => {
        return this.request(url, {...options}, options.timeout);
    };

    post = (url: string, options: Options = {method: METHODS.POST}) => {
        return this.request(url, {...options}, options.timeout);
    };

    delete = (url: string, options: Options = {method: METHODS.DELETE}) => {
        return this.request(url, {...options}, options.timeout);
    };

    request = (url: string, options: Options, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (options.method === METHODS.GET && !!options.data) {
                url = url + options.data;
            }

            xhr.open(options.method, url);

            if (options.headers) {
                const headers: Record<string, string> = options.headers as Record<string, string>;
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onloadend = function () {
                throw new Error('Request timeout');
            };

            xhr.timeout = timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (options.method === METHODS.GET) {
                if (!options.data) {
                    xhr.send();
                } else {
                    const requestData: string = options.data as string
                    xhr.send(requestData);
                }
            } else {
                if (!options.data) {
                    xhr.send();
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify(options.data));
                }
            }
        });
    };
}

import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';

import HTTPTransport from './HTTPTransport.ts';

describe('HTTP Transport', () => {
  describe('Transforming an object into a query', () => {
    it('should transform object to query', () => {
      const query = { a: '1', b: '2' };

      const result = HTTPTransport.queryStringify(query);
      const expected = '?a=1&b=2';

      expect(result).to.equal(expected);
    });

    it('should transform empty object to query', () => {
      const query = {};

      const result = HTTPTransport.queryStringify(query);
      const expected = '?';

      expect(result).to.equal(expected);
    });
  });

  describe('Requests', () => {
    use(sinonChai);

    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub<any>;

    beforeEach(() => {
      http = new HTTPTransport();
      request = sandbox.stub(http, 'request' as keyof typeof http)
        .callsFake(() => Promise.resolve({} as XMLHttpRequest));
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should set request method to "get"', () => {
      const someUrl = '/get_request';
      const someHeaders = { a: '1', b: '2' };

      http.get(someUrl, { headers: someHeaders });

      const expectedData = { headers: someHeaders, method: 'GET' };

      expect(request).calledWithMatch(someUrl, expectedData);
    });

    it('should set request method to "put"', () => {
      const someUrl = '/put_request';
      const someHeaders = { a: '1', b: '2' };

      http.put(someUrl, { headers: someHeaders });

      const expectedData = { headers: someHeaders, method: 'PUT' };

      expect(request).calledWithMatch(someUrl, expectedData);
    });

    it('should set request method to "post"', () => {
      const someUrl = '/post_request';
      const someHeaders = { a: '1', b: '2' };

      http.post(someUrl, { headers: someHeaders });

      const expectedData = { headers: someHeaders, method: 'POST' };

      expect(request).calledWithMatch(someUrl, expectedData);
    });

    it('should set request method to "delete"', () => {
      const someUrl = '/delete_request';
      const someHeaders = { a: '1', b: '2' };

      http.delete(someUrl, { headers: someHeaders });

      const expectedData = { headers: someHeaders, method: 'DELETE' };

      expect(request).calledWithMatch(someUrl, expectedData);
    });
  });
});

import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org',
});

global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.location = jsdom.window.location;

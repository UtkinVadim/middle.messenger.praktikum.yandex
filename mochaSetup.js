import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

import { JSDOM } from 'jsdom';
import hook from 'css-modules-require-hook';

register('ts-node/esm', pathToFileURL('./'));

hook({
  extensions: ['.scss'],
});

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org',
});

global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.location = jsdom.window.location;

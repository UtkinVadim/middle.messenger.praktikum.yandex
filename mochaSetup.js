import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));

import saas from 'node-sass';
import { JSDOM } from 'jsdom';
import hook from 'css-modules-require-hook';

hook({
  extensions: ['.scss'],
  preprocessCss: data => saas.renderSync()
})

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org'
});

global.window = jsdom.window;
global.history = jsdom.window.history;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.location = jsdom.window.location;

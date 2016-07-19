import path from 'path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export default function render(view, locals = {}) {
    const component = require(path.join(__dirname, '..', 'common', 'container', view));
    return `<html><head><title>Hello</title></head><body><div id="root">${renderToString(createElement(component, locals))}</div><script src="/assets/main.js"></script></body></html>`;
}

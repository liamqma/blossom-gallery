import { assign } from "lodash";
import config from "config";
import Koa from "koa";
import conditional from "koa-conditional-get";
import etag from "koa-etag";
import logger from "koa-logger";
import proxy from "koa-proxy";
import staticCache from "koa-static-cache";
import cache from "koa-cache-control";
import convert from "koa-convert";
import site from "./router/site";

const debug = require('debug')('app-bootstrap');

const app = new Koa();
module.exports = app;

// static cache proxy
if (config.app.staticProxy) {
    const opts = assign({}, config.app.staticProxy);
    debug('static proxy enabled with options: %j', opts);
    if (opts.match) {
        opts.match = new RegExp(opts.match);
    }
    if (opts.port) {
        opts.host = `${opts.host}:${opts.port}`;
    }
    app.use(convert(proxy(opts)));
}

// nginx will handle this outside of dev
if (config.app.staticCache) {
    debug('static cache enabled at path: %s', config.app.staticCache);
    app.use(convert(staticCache(config.app.staticCache)));
}

// request logging
if (config.app.logger) {
    debug('request logger enabled');
    app.use(convert(logger()));
}

// app cache
app.use(convert(cache({
    public: true,
    maxAge: 5 * 60
})));
app.use(convert(conditional()));
app.use(convert(etag()));
// routing
app.use(site.routes());

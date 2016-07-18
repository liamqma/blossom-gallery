process.env.NODE_CONFIG_DIR = './lib/config';
const config = require('config');
const debug = require('debug')('app-main');

// Require hook is used on development only
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('babel-register');
}

// run app
const app = require('./lib/app');
const port = process.env.PORT || config.app.port;
app.listen(port, (err) => {
    if (err) throw err;
    debug(`listening on ${port}`);
});

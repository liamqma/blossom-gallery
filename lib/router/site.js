import render from '../util/render';
const router = require('koa-router')();

router.get('home', '/', (ctx) => { ctx.body = render('index') });

export default router;

const router = require('koa-router')();

router.get('home', '/', async (ctx) => { await ctx.render('index') });

export default router;

const Koa = require('koa');
const evo = new Koa();

const Router = require('koa-router');
const router = new Router();

const bodyParser = require('koa-bodyparser');
evo.use(bodyParser({
  formLimit: '10mb'
}));

const console = require("console");
const purifycss = require("purify-css");

router.get('/', ctx => {
  ctx.redirect('/purifycss');
});

router.post('/purifycss', ctx => {
  const html = ctx.request.body.html;
  const css = ctx.request.body.css;
  const opt = {minify: true};
  if (html && css) {
    ctx.body = purifycss(html, css, opt);
  } else {
    ctx.body = `POST DATA ERROR :(`;
  }
});

evo
  .use(router.routes())
  .use(router.allowedMethods());

evo.listen(18888);
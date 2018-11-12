const Koa = require('koa');
const koaWebpack = require('koa-webpack');
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router');


module.exports = function serve({
  koaWebpackOptions,
  serveOptions={
    tplName: '',
    port: 0
  }
}) {

  const app = new Koa();

  let router = new Router();


  koaWebpack(koaWebpackOptions)
    .then((middleware) => {
      let { hotClient, devMiddleware, close } = middleware;

      app.use(middleware);

      // app.use(tool.proxyMiddleware('/science', {
      //   target: 'https://live.xueersi.com',
      //   changeOrigin: true
      // }));

      app.use(static(path.resolve(__dirname, '../')))

      // app.use(tool.fallbackMiddleware({}));

      router.use('/', async ctx => {
        ctx.response.type = 'html'
        ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(serveOptions.tplName)
      });

      // devMiddleware.waitUntilValid(()=>{
      //   tool.openBrowser(`http://${tool.localIP()}:${3002}`)
      // })

      app
        .use(router.routes())
        .use(router.allowedMethods());

    });

  app.listen(serveOptions.port)

}


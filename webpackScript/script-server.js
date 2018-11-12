const Koa = require('koa');
const app = new Koa();
const koaWebpack = require('koa-webpack');
const webpackCfg = require('../webpackConf/dev')
const tool = require('./tool')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router');

let router = new Router();

koaWebpack({
  config: webpackCfg,
  hotClient: {
    reload: false,
    hmr: true,
    allEntries: true,
    host: 'localhost',
    port: 3082,
  }
})
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
    const filename = path.resolve(webpackCfg.output.path, 'index.html')
    ctx.response.type = 'html'
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
  });
  
  // devMiddleware.waitUntilValid(()=>{
  //   tool.openBrowser(`http://${tool.localIP()}:${3002}`)
  // })

  app
    .use(router.routes())
    .use(router.allowedMethods());

});

app.listen(3002)
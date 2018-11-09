const Koa = require('koa');
const app = new Koa();
const koaWebpack = require('koa-webpack');
const webpackCfg = require('../config/webpack.dev.forServer')
const tool = require('./tool')
const path = require('path')
const static = require('koa-static')
const Router = require('koa-router');

let router = new Router();

let params = 'stuId=57217&liveId=238019&stuCouId=9630757&classId=25683&teamId=1&packageId=59185&packageSource=2&packageAttr=2&classTestId=2&releasedPageInfos=[%7B%2272893%22:[%2224%22,%22101603%22]%7D,%7B%2272894%22:[%2224%22,%22101599%22]%7D,%7B%2272895%22:[%2224%22,%221649341%22]%7D,%7B%2272896%22:[%2224%22,%221649340%22]%7D]&isPlayBack=0&educationStage=2&isShowTeamPk=1&nonce=57217_1541750548044&stuClientPath=aHR0cDovLzEyNy4wLjAuMTozNjc3NC9jb3Vyc2V3YXJlLzIwMTgxMTA5LzIzODAxOS81OTE4NS8='

'aHR0cDovLzEyNy4wLjAuMTo0MjcwOS9jb3Vyc2V3YXJlLzIwMTgxMDMwLzIxNTk0NS82NzE4OC8='

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

 

  app.use(tool.proxyMiddleware('/science', {
    target: 'https://live.xueersi.com',
    changeOrigin: true
  }));

  app.use(static(path.resolve(__dirname, '../')))
  
  // app.use(tool.fallbackMiddleware({}));

  router.use('/', async ctx => {
    const filename = path.resolve(webpackCfg.output.path, 'index.html')
    ctx.response.type = 'html'
    ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename)
  });
  
  devMiddleware.waitUntilValid(()=>{
    tool.openBrowser(`http://${tool.localIP()}:${3001}?` + params)
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());

});

app.listen(3001)
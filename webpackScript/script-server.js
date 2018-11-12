const webpackCfg = require('../webpackConf/config.dev')
const devConfig = require('../devConfig.js');
const path = require('path')
const serve = require('./serve.js');


webpackCfg.forEach((config, indx)=>{
  serve({
    koaWebpackOptions: {
      config,
      hotClient: {
        reload: false,
        hmr: true,
        allEntries: true,
        host: 'localhost',
        port: devConfig.startPort+indx-1000,
      }
    },
    serveOptions: {
      tplName: path.resolve(config.output.path, config.output.filename),
      port: devConfig.startPort + indx
    }
  })
})


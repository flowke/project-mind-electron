const { execSync } = require('child_process');
const internalIp = require('internal-ip');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const proxy = require('http-proxy-middleware');

module.exports = {
  openBrowser: (url)=>{
    execSync('ps cax | grep "Google Chrome"');
    execSync(
      `osascript chrome.applescript "${encodeURI(url)}"`,
      {
        cwd: __dirname,
        stdio: 'ignore',
      }
    );
  },

  localIP: () => internalIp.v4.sync(),
  fallbackMiddleware: (historyOptions) => convert(history(historyOptions)),
  proxyMiddleware: (...args) => convert(proxy(...args))
}
const webpack = require('webpack')
const prodConfig = require('../config/webpack.prod.forTester')
const testConfig = require('../config/webpack.prod')
const statsConfig = require('../config/webpack.prod.forStats')

let buildVersion = process.env.BUILD_VERSION;
let isStat = process.env.IS_STATS === 1;

let config = testConfig; 

if (buildVersion === 'prod'){
  config = prodConfig
}

if (isStat){
  config = statsConfig;
}

const compiler = webpack(config);


compiler.run((err, stats)=>{

  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log(stats.toString({
    colors: true
  }))
})

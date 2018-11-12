const {resolve} = require('path');

let root = (...a)=>resolve(__dirname,...a);
let src = (...a)=>root('pageSrc',...a);

let paths = {
  root: resolve(__dirname)
}

let entry = {
  index: src('index.js'),
  mind: src('mind.js'),
}

module.exports = {
  paths,
  entry,
  startPort: 6001
}
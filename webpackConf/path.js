const {resolve} = require('path');

let root = (...a)=>resolve(__dirname, '../', ...a)

module.exports = {
  root,
  tmpl: (...a) => root('pageSrc/htmls', ...a),
  src: (...a) => root('pageSrc',...a)
}



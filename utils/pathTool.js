const path = require('path');

module.exports = {
  rootTo: (...args)=>{
    return path.resolve(__dirname, '../', ...args)
  }
}
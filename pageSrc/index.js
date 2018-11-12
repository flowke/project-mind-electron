import Index from './views/index';

import 'antd/dist/antd.css';

ReactDOM.render(
  <Index className=""></Index>,
  document.getElementById('app'),
)

if(module.hot){
  module.hot.accept()
}
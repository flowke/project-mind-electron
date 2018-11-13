import Index from './views/index';

import 'antd/dist/antd.css';
import '@@common/style/main.scss';

ReactDOM.render(
  <Index className=""></Index>,
  document.getElementById('app'),
)

if(module.hot){
  module.hot.accept()
}
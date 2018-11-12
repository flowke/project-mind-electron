import React from 'react';
import ReactDOM from 'react-dom';
import Mind from './views/mind';

ReactDOM.render(
  <Mind className=""></Mind>,
  document.getElementById('app'),
)

if (module.hot) {
  module.hot.accept()
}
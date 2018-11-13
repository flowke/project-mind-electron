import React, { Component } from 'react';
import {
  Layout,
  Menu,
  Icon
} from 'antd';

import './mainLayout.scss';

let { Sider, Content } = Layout;


export default class extends Component {

  render() {
    return (
      <Layout className="main-layout">
        <Sider
          theme="light"
          width="54"
        >
          <Menu
            className="main-layout-menu"
          >
            <Menu.Item className="main-layout-menuitem">
              <Icon type="thunderbolt" style={{fontSize: '22px'}} />
            </Menu.Item>
            <Menu.Item className="main-layout-menuitem"><Icon type="book" style={{ fontSize: '22px' }} /></Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}
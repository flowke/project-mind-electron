import React, {Component} from 'react';
import {
  Layout,
  Menu,
  Icon
} from 'antd';

let { Sider, Content} = Layout;

export default class extends React.Component{

  render(){
    return (
      <Layout>
        <Sider
          theme="light"
          width="50"
        >
          <Menu>
            <Menu.Item><Icon type="thunderbolt" /></Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

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
          width="54"
        >
          <Menu>
            <Menu.Item>ffffff<Icon type="thunderbolt" size="larger"/></Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    )
  }
}

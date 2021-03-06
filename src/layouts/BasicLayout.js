import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import SiderBar from '../components/SiderBar/SiderBar.js';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Bread from '../components/Bread/Bread.js';

import routers from '../router/Router.js';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const PageFooter = ({ footText, style }) => {
  return <Footer style={style}>{footText}</Footer>;
};

class BasicLayout extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            theme="dark"
            style={{ color: '#0EA679' }}
          >
            <div
              style={{
                height: '32px',
                background: 'rgba(255, 255, 255, 0.2)',
                margin: '16px',
                textAlign: 'center',
                lineHeight: '32px'
              }}
            >
              <span>运营平台</span>
            </div>
            <SiderBar router={routers} />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <div style={{ padding: 16, paddingBottom: 0 }}>
              <Bread />
            </div>
            <Content
              style={{
                margin: '16px',
                background: '#fff'
              }}
            >
              <Switch>
                {routers.map(item => {
                  if (item.childRouter && item.childRouter.length > 0) {
                    let childRouter = item.childRouter;
                    return childRouter.map(itemChild => {
                      return (
                        <Route
                          exact={true}
                          path={itemChild.path}
                          component={itemChild.component}
                          key={itemChild.path}
                        />
                      );
                    });
                  } else {
                    return (
                      <Route
                        exact={true}
                        path={item.path}
                        component={item.component}
                        key={item.path}
                      />
                    );
                  }
                })}
              </Switch>
            </Content>
            <PageFooter
              style={{ textAlign: 'center' }}
              footText=" Copyright © 2012-2019 webpack——antd——@byxiaoping"
            />
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}
export default BasicLayout;

import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { View as Counter } from '@src/pages/Counter/'

const CounterContainer = connect()(Counter)

const { Header, Content, Footer, Sider } = Layout

class Demo extends React.Component {
  generatedBreadcrumb = () => {  // 生成面包屑导航
    const { pathname } = this.props.location
    const pathnames = pathname.split('/')
    if (pathnames.length === 3) pathnames[0] = 'Home'
    return pathnames
  }

  render() {
    const pathnames = this.generatedBreadcrumb()

    return (
      <div>
        <Layout>
          <Sider style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['counter']}>
              <Menu.Item key="counter">
                <Link to="/demo/counter">Counter</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Breadcrumb style={{ padding: '18px 24px' }}>
                {
                  pathnames.map((item, index) => (
                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                  ))
                }
              </Breadcrumb>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff' }}>
                { pathnames.length === 3 ? '' : <Redirect to="/demo/counter" /> }
                <Route path="/demo/counter" component={CounterContainer} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default Demo

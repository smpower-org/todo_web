import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { View as Counter } from '@src/pages/Counter/'
import Users from './Users'

const { Header, Content, Footer, Sider } = Layout

const siders = [
  {
    to: '/demo/counter',
    text: 'counter',
    component: Counter,
  },
  {
    to: '/demo/users',
    text: 'users',
    component: Users,
  },
]

@connect()
class Demo extends React.Component {
  generatedBreadcrumb = () => {  // 生成面包屑导航
    const { pathname } = this.props.location
    const pathnames = pathname.split('/')
    if (pathnames.length === 3) {
      pathnames[0] = 'Home'
      if (pathnames[2] === '') pathnames.splice(pathnames[2], 1)
    }
    return pathnames
  }

  render() {
    const pathnames = this.generatedBreadcrumb()
    
    if (pathnames.length === 2) return <Redirect to={siders[0].to} /> 

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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathnames[pathnames.length - 1]]}>
              {
                siders.map((item, index) => (
                  <Menu.Item key={item.text}>
                    <Link to={item.to}>{item.text}</Link>
                  </Menu.Item>
                ))
              }
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
                {
                  siders.map((item, index) => (
                    <Route key={index} path={item.to} component={item.component} />
                  ))
                }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export { Demo as View }

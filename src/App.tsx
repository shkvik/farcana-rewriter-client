import React from 'react';
import { Breadcrumb, Layout, Menu, ConfigProvider, ThemeConfig } from 'antd';
import type { MenuProps } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Articles from './pages/articles/Articles';
import Logo from './farcanaLogo.svg'
import { FileTextOutlined } from '@ant-design/icons';
import ArticalPage from './components/articalPage/ArticalPage';


const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


const Home: React.FC = () => {
  return (
    <div>
      <h1>Главная страница</h1>
    </div>
  );
};


const items: MenuItem[] = [
  {
    label: <Link to="/articles"> Articles </Link>,
    key: '0',
    icon: <FileTextOutlined  />,
  },
];

const custTheme: ThemeConfig = {
  token: {
    colorLink: '#1890ff',
    colorPrimaryBg: '#e6f7ff',
    colorPrimary: '#524F9D',
    //fontFamily: 'Courier',
    //colorBgLayout: '#06090E',
    //colorBgContainer: '#06090E',
    colorBgMask: 'blue',
    //colorText: '#437FB1',
    colorPrimaryTextHover: 'black'
  },
}

const App: React.FC = () => {
  

  return (
    <Router>
       <ConfigProvider theme={custTheme}>
       
        <Layout>
          <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                float: 'left',
                width: 140,
                height: 31,
                margin: '16px 24px 16px 0',
                textAlign: 'center',
                alignItems: 'center'
              }}
            > <img src={Logo} alt="Logo" /> </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items= {items}

            />
          </Header>
          
          <Content className="site-layout" style={{ padding: '0 50px' }}>

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> 

            <div style={{
              paddingTop: 20,
              paddingLeft: 100,
              paddingRight: 100,
              minHeight: "75vh", 
            }}>

              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/articles" element={<Articles/>}/>
                <Route path="/articles/:id" element={<ArticalPage/>}/>
              </Routes>
            </div>

          

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout> 
        </ConfigProvider>
      </Router>
  );
};

export default App;
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Articles from './pages/articles/Articles';

import {
  DashboardOutlined,
  SettingOutlined,
  ToolOutlined,
  StarOutlined,
  DatabaseOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
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
    icon: <DashboardOutlined />,
  },
  {
    label: <Link to="/home">Settings</Link>,
    key: '1',
    icon: <SettingOutlined />,
  },
  {
    label: <Link to="/developing">Tools</Link>,
    key: '2',
    icon: <ToolOutlined />,
  },
  {
    label: <Link to="/developing">Favorites</Link>,
    key: '3',
    icon: <StarOutlined />,
  },
  {
    label: <Link to="/developing">Archive</Link>,
    key: '4',
    icon: <DatabaseOutlined />,
  },
  
  {
    label: <Link to="/about">About</Link>,
    key: '6',
    icon: <InfoCircleOutlined />,
  },
  {
    label: <Link to="/">Home</Link>,
    key: '7',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/developing">Search</Link>,
    key: '5',
    icon: <SearchOutlined />,
  },
];



const App: React.FC = () => {
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
          <div
            style={{
              float: 'left',
              width: 120,
              height: 31,
              margin: '16px 24px 16px 0',
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
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
            padding: 24,
            minHeight: "75vh", 
            background: colorBgContainer 
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
      </Router>

    
    
  );
};

export default App;

//<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//
//<Routes>
//  <Route path="/articles" Component={Articles}/>
//  <Route path="/home" Component={Home}/>
//</Routes>
//</div>
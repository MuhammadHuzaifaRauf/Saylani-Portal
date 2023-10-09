import React, { useState } from 'react';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, DoubleRightOutlined, UnorderedListOutlined, CalendarOutlined,
  FileTextOutlined, SearchOutlined, PlusOutlined,UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider, message } from 'antd';

import { Link } from 'react-router-dom';
import Routes from './Routes';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../../pages/Context/AuthContext'
import { auth } from '../../config/firebase';
const { Header, Sider, Content } = Layout;
const { Search } = Input;
export default function Sidbar() {

  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { isAuth, user, dispatch } = useAuthContext()

  const HandleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" })
        message.success("SignOut Successfully!")
      })
      .catch((err) => {
        message.error("Something Went Wrong")
      })
  }

  return (

    <Layout  >
      <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
        <div className="demo-logo-vertical" />
        <h5 className=' fw-bold mt-4 mb-3' >Portal</h5>


        <Menu
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}
          items={[

            {
              key: '/',
              icon: 
              <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Dashboard</Link>,
            },
            {
              key: '/students',
              icon: <UserOutlined />,
              label: <Link to="/students" className='nav-link'>Students</Link>,
            },
            {
              key: '/courses',
              icon: <UnorderedListOutlined />,
              label: <Link to="/courses" className='nav-link'>Courses</Link>,
            },
            {
              key: '/attendance',
              icon: <CalendarOutlined />,
              label: <Link to="/attendance" className='nav-link'>Attendance</Link>,
            },
          ]}
        />

        <Divider />
        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}

          items={[

            {
              key: '3',
              icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
              label: <a className=' nav-link' onClick={HandleLogout} > Sign Out</a>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}

          />
          <span className='fs-3 ms-2'>Saylani Portal</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',

            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}


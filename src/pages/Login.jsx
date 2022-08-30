import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './less/login.less';
import logoImg from '../assets/logo.png'
const App = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [isHovering,setisHovering] = useState(false);
  const handleMouseEnter = ()=>{
    setisHovering(true);
  }
  const handleMouseLeave = ()=>{
    setisHovering(false);
  }

  return (
    <div className='login'>
        <div className='login_box'>
        <img src={logoImg} alt="" />
        <Form
        name="basic"      
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >

        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}
        >
            <Input 
                prefix={<UserOutlined  />} 
                placeholder='请输入用户名' 
                size="large"
            />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
            <Input.Password  
                prefix={<LockOutlined  />}
                placeholder='请输入密码' 
                size='large'
            />
        </Form.Item>
  
        <Form.Item>
            <Link to="/register"
            style={{textDecoration:isHovering ? "underline" :'none'}}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >还没账号？点击注册</Link>
        </Form.Item>
        <Form.Item >
            <Button type="primary" block htmlType="submit" size="large">
            登录
            </Button>
        </Form.Item>
        </Form>
        </div>
    </div>
  );
};

export default App;
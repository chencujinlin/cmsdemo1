import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './less/register.less';
import logoImg from '../assets/logo.png'
import { RegisterApi } from '../request/api';

export default function Register() {
    const navigate = useNavigate()


    const onFinish = (values) => {
        RegisterApi({
            username: values.username,
            password: values.password
        }).then(res => {
            if (res.errcode === 0) {
                message.success(res.message)
                setTimeout(() => navigate('/login'), 1500)
            } else {
                message.error(res.message)
            }
        })
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [isHovering, setisHovering] = useState(false);
    const handleMouseEnter = () => {
        setisHovering(true);
    }
    const handleMouseLeave = () => {
        setisHovering(false);
    };
    return (
        <div className='Register'>
            <div className='register_box'>
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
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='请输入用户名'
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder='请输入密码'
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请再次确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不同'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder='请确认密码'
                            size='large' />
                    </Form.Item>

                    <Form.Item>
                        <Link to="/login"
                            style={{ textDecoration: isHovering ? "underline" : 'none' }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >已有账号？点击登录</Link>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" block htmlType="submit" size="large">
                            立即注册
                        </Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    );
};


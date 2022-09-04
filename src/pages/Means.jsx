import React, {useEffect, useState} from 'react';
import './less/means.less';
import { Form, Input,Button} from 'antd';
import {GetUserDataApi,ChangeUserDataApi} from "../request/api";

export default function Means() {

    //获取用户资料
  useEffect(()=>{
    GetUserDataApi().then(res => {
      console.log(res)
    },[])
  });
  //获取表单
    const onFinish = (values) => {
        if (values.username && values.username !== sessionStorage.getItem('username')&& values.password.trim() !== ""){
            ChangeUserDataApi({username:values.username,password:values.password}).then(res=>{
                   console.log(res)
            })
        }
    }
  return (
    <div className='means'>
      <Form
          style={{width: '400px'}}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}

          autoComplete="off"
      >
        <Form.Item
            label="修改用户名"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
        >
          <Input placeholder='请输入新用户名' />
        </Form.Item>

        <Form.Item
            label="修 改 密 码"
            name="password"
        >
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{float: 'right'}} >提交</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

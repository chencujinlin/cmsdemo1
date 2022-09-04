import React, {useEffect, useState} from 'react'
import {Menu} from 'antd';
import {ReadOutlined, EditOutlined, DatabaseOutlined} from '@ant-design/icons';
import {useNavigate, useLocation} from "react-router-dom";

export default function Aside() {
    const navigate = useNavigate('')
    const location = useLocation()
    const handleClick = e => {
        navigate('/' + e.key)
    };
    const [Defaultkey , setDefaultKey] = useState('')
    useEffect(() => {
        let path = location.pathname;
        let key = path.split('/')[1]
        setDefaultKey(key)
    }, [location.pathname])

    return (
        <Menu
            onClick={handleClick}
            style={{width: 180}}
            defaultselectedkey={['list']}
            mode="inline"
            theme="dark" // 黑色主题
            className="aside"
        >
            <Menu.Item key="listlist"><DatabaseOutlined/> 查看文章列表list </Menu.Item>
            <Menu.Item key="listtable"><DatabaseOutlined/> 查看文章列表table </Menu.Item>
            <Menu.Item key="edit"><EditOutlined/> 文章编辑 </Menu.Item>
            <Menu.Item key="means"><DatabaseOutlined/> 修改资料 </Menu.Item>

        </Menu>
    )
}

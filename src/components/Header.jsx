import React, {useState, useEffect} from "react";
import logoImg from '../assets/logo.png'
import {Menu, Dropdown, message} from 'antd';
import {CaretDownOutlined} from '@ant-design/icons';
import defaultAvatar from '../assets/defaultAvatar.png'
import {Link, useNavigate} from 'react-router-dom'


export default function Header() {
    const [username, setusername] = useState('游客')
    const [avatar, setAvatar] = useState(defaultAvatar)
    const navigate = useNavigate()
    const logout = () => {
        message.success('退出成功，返回登录页')
        localStorage.clear();
        setTimeout(() => navigate('/login', 1500))
    }
    useEffect(() => {
        let username1 = localStorage.getItem('username')
        let avatar1 = localStorage.getItem('avatar')
        if (username1) {
            setusername(username1)
        }
        if (avatar1) {
            setAvatar('http://47.93.114.103:6688/' + avatar1)
        }
    }, [])
    const menu = (
        <Menu>
            <Menu.Item key={1}>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    修改资料
                </a>
            </Menu.Item>
            <Menu.Item key={2}>
                <Link to='/login' onClick={logout}>退出登录
                </Link>
            </Menu.Item>

        </Menu>
    );
    return <div>
        <header>
            <img src={logoImg} alt="" className="logo"/>

            <div className='right'>
                <Dropdown overlay={menu}>

                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <img src={avatar} alt="" className="avatar"/>
                        <span>{username}</span>
                        <CaretDownOutlined/>
                    </a>
                </Dropdown>
            </div>
        </header>
    </div>
}


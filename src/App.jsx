import React from "react";
import "./assets/base.less"
import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import logoImg from './assets/logo.png'

const App = () => {
    const { Sider, Content } = Layout;
    return (
        
        <Layout id='app'>
        
        <header>
        <img src={logoImg} alt=""  className="logo"/></header>
        <Layout>
            <Sider>Sider</Sider>
            <Content>
            <div>
                <Outlet/>
            </div>
            </Content>
            </Layout>
            <footer>Respect | Copyrigt | 2022 Author @chncu</footer>
        </Layout>
    )
}
export default App;

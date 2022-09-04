import React from "react";
import "./assets/base.less"
import {Outlet} from "react-router-dom";
import {Layout} from 'antd';

import Header from "./components/Header";
import Asider from "./components/Aside"
import Bread from "./components/Bread"


export default function App() {
    return (
        <Layout id='app'>
            <Header/>
            <div className='container'>
                <Asider />
                <div className='container_box'>
                    <Bread/>
                    <div className="container_content">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer>Respect | Copyright &copy; 2022 Author chencu</footer>
        </Layout>
    )
}

import { Breadcrumb } from 'antd';
import React,{useEffect,useState} from 'react';
import { HomeOutlined } from '@ant-design/icons'
import {useLocation} from "react-router-dom";

export default function Bread (){
    const  [breadName , setbreadName]= useState('')
    const {pathname} = useLocation()
    useEffect(()=>{
        switch (pathname){
            case '/listlist':
                setbreadName('查看文章列表list');
                break
            case '/listtable':
                setbreadName('查看文章列表table');
                break
            case '/edit' :
                setbreadName('文章编辑');
                break
            case '/means':
                setbreadName('修改资料');
                break
            default :
                 setbreadName(pathname.includes('edit')? '文章编辑' : "");
                break;

        }
    },[pathname])
  return(
    <Breadcrumb style={{height:'30px',lineHeight:'30px'}}>
      <Breadcrumb.Item href='/'>
        <HomeOutlined/>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">{breadName}</a>
      </Breadcrumb.Item>
    </Breadcrumb>
)
}


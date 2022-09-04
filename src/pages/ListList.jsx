import React, {useEffect, useState } from 'react'
import {List, Skeleton, Pagination ,Button ,message} from 'antd';
import {ArticleListApi,ArticleDelApi} from "../request/api";
import moment from 'moment'
import {useNavigate} from "react-router-dom";


export default function ListList() {
    //文章列表
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [current, setCurrent] = useState(1)
    const [pageSize, setpageSize] = useState(10)
    const navigate = useNavigate()

    const delList = (id)=>{
        ArticleDelApi({id}).then(res=>{
            if (res.errCode===0){
                message.success(res.message)
                //重新刷新

            }

            }
        )
    }

    const getList = (num) => {
        ArticleListApi(
            {
                num: current,
                count: pageSize
            }
        ).then(res => {
            console.log(res)
            if (res.errCode === 0) {
                let {arr, total, num, count} = res.data;
                setList(arr);//获取文章列表
                setTotal(total);
                setCurrent(num);
                setpageSize(count)
            }
        })
    }

    useEffect((pages) => {
        getList(pages)
    }, [])



    const onChange = (pages) => {
        getList(pages)
    }


    return (
        <div className='list_table' style={{padding: '20px'}}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<Button type='primary' onClick={() => navigate('/edit/'+item.id)}>编辑</Button>,
                            <Button type='danger' onClick={()=>delList(item.id)}>删除</Button>]}
                    >
                        <Skeleton loading={false} >
                            <List.Item.Meta
                                title={<a href="!#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div>{moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination  total={total} current={current} pageSize={pageSize} onChange={onChange}
                        style={{float: "right", marginTop: '20px'}}/>
        </div>
    )
}
import React, {useEffect, useState} from 'react';
import './less/ListTable.less';
import {Space, Button, Table, Tag, Pagination, message} from 'antd';
import {Link} from 'react-router-dom';
import {ArticleDelApi, ArticleListApi} from "../request/api";
import moment from "moment";
import {useNavigate} from "react-router-dom";


function Mytitle(props) {
    return (
        <div>
            <a to='/' className='table_title' href={"http://codesohigh.com:8765/article/" + props.id}>{props.title}</a>
            <p style={{color: '#999'}}>{props.subTitle}</p>
        </div>

    )
}

export default function ListTable() {
    const navigate = useNavigate()

    //列表数组
    const [arr, setArr] = useState([
        {
            key: '1',
            name: 'chencu',
            adress: 'chinses'
        }
    ]);
    //分页
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 10});
    //处理数据
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                //更改pagination
                let {num, count, total} = res.data;
                console.log(res.data)
                setPagination({
                    current: num,
                    pageSize: count,
                    total: total
                })
                let newArr = JSON.parse(JSON.stringify(res.data.arr))
                let myarr = []
                //    1.需要给每个数组想增加key，让key=id
                //    2.需要有一套标签结构，赋予属性
                newArr.map(item => {

                    let obj = {
                        key: item.id,
                        date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
                        mytitle: <Mytitle title={item.title} subTitle={item.subTitle}/>
                    }
                    myarr.push(obj)


                })
                setArr(myarr)
            }
        })
    }
    //请求文章列表
    useEffect(() => {
            getArticleList(pagination.current, pagination.pageSize)
        }
        , [])
    const delFn = (id) => {
        ArticleDelApi({ id }).then(res => {
            if (res.errCode === 0) {
                message.success(res.message)
                // 重新刷页面，要么重新请求这个列表的数据   window.reload   调用getList(1)  增加变量的检测
                getArticleList(1, pagination.pageSize);
            } else {
                message.success(res.message)
            }
        })
    }

    //分页函数
    const pageChange = (arg) => {
        getArticleList(arg.current, arg.pageSize)


    }
// 每一列
    const columns = [
        {

            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => <div>{text}</div>

        },

        {

            dataIndex: 'date',
            key: 'date',
            render: text => (
                <p>
                    {text}
                </p>
            )
        },
        {

            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <Button type='primary' onClick={() => navigate('/edit/'+text.key)}>编辑</Button>
                    <Button type='danger' onClick={() => delFn (text.key)}>删除</Button>
                </Space>
            ),
        },
    ];


    return (

        <div className='list_table'>
            <Table
                dataSource={arr}
                columns={columns}
                showHeader={false}
                onChange={pageChange}
                pagination={pagination}
            />
        </div>
    );

}


import {PageHeader, Button, Modal, Form, Input, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {EditApi, ArticleSeachApi, ArticleUpdataApi} from "../request/api";
import moment from "moment";
import E from 'wangeditor';
import {useParams, useLocation, useNavigate} from "react-router-dom";

let editor = null;
export default function Edit() {
    const params = useParams()
    const location = useLocation()
    const [title, setTitle] = useState('')
    const [subTitle, setsubTitle] = useState('')
    const navigate = useNavigate()

    //富文本编辑器
    const [content, setContent] = useState('')

    useEffect(() => {
        editor = new E('#div1')
        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }

        editor.create()
        //根据地址栏id做请求
        if (params.id) {
            ArticleSeachApi({
                id: params.id
            }).then(res => {
                console.log(res)
                editor.txt.html(res.data.content)//重新提交编辑器
                setTitle(res.data.title)
                setsubTitle(res.data.subTitle)
            })
        }
        return () => {
            editor.destroy()
        }
    }, [location.pathname])
    //模态框
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm();
    //对话框点击提交
    const dealData = (errCode, msg) => {
        setIsModalVisible(false)
        if (errCode === 0) {
            message.success(msg)
            setTimeout(() => {
                navigate('/listlist')
            })
        } else {
            message.error(msg)

        }
    }
    const handleOK = () => {
        setIsModalVisible();//关闭对话框
        form
            .validateFields()//校验问文件
            .then((values) => {
                form.resetFields();//重置输入框
                let {title, subTitle} = values;
                //地址栏有id更新id
                if (params.id) {
                    ArticleUpdataApi({
                            content,
                            id: params.id,
                            subTitle,
                            title
                        }
                    ).then(res => {
                        dealData(res.errCode, res.message)
                    })
                } else {
                    EditApi(
                        {title, subTitle, content}
                    ).then(res =>  dealData(res.errCode, res.message))
            }})
            .catch(() => false)
}
        const showModal = () => {
            setIsModalVisible(true);
        };
                return (
                    <div>
                        <PageHeader
                            ghost={false}
                            onBack={params.id ? () => window.history.back() : null}
                            title="文章编辑"
                            subTitle={"当前日期：" + moment(new Date()).format("YYYY-MM-DD")}
                            extra={
                                [
                                    <Button key="1" type="primary" onClick={showModal}>
                                        提交文章
                                    </Button>
                                ]
                            }
                        > </PageHeader>
                        <div id="div1" style={{padding: '0 20px 20px', background: '#fff'}}></div>
                        <Modal
                            zIndex={99999}
                            title="填写文章标题"
                            visible={isModalVisible}
                            onClick={() => setIsModalVisible(true)}
                            onCancel={() => setIsModalVisible(false)}
                            onOk={handleOK}
                        >
                            <Form
                                form={form}
                                name="basic"
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 20,
                                }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="标题"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请填写标题',
                                        },
                                    ]}
                                    initialValue={params.id ? title : null}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label="副标题"
                                    name="subTitle"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!',
                                        },
                                    ]}
                                    initialValue={params.id ? subTitle : null}
                                >
                                    <Input/>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                )
}

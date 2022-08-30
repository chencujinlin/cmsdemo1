import request from './request'

//注册的api
export const RegisterApi = (params) => request.post('/register', params)

//登录的api
export const LoginApi = (params) => request.post('/login',params)
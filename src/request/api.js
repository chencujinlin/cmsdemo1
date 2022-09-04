import request from './request'

//注册的api
export const RegisterApi = (params) => request.post('/register', params)

//登录的api
export const LoginApi = (params) => request.post('/login',params)

//获取文章列表
export const ArticleListApi = (params) => request.get('/article' ,{params})

//添加文章
export const EditApi = (params) => request.post('/article/add' , params)

//查看文章
export const ArticleSeachApi = (params) => request.get(`/article/${params.id}`  )

//重新编辑文章
export const ArticleUpdataApi = (params) => request.put('/article/update' , params)

//删除
export const ArticleDelApi = (params) => request.post('/article/remove',params)

//查看用户资料
export const GetUserDataApi = (params) => request.get('/info')

//修改用户资料
export const ChangeUserDataApi = (params) => request.put('/info',params)
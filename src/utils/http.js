// axios基础封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'


const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器

http.interceptors.request.use(config => {
    // 从pinia里面获取token
    const UserStore = useUserStore()
    // 按照后端要求拼接数据
    const token = UserStore.userInfo.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
    const UserStore = useUserStore()
    // 统一错误提示
    ElMessage(
        {
            type: 'warning',
            message: e.response.data.message
        }
    )

    // 401token失效处理
    // 1.清除本地用户数据
    // 2.跳转道登录页
    const router = useRouter()
    if (e.response.status === 401) {
        UserStore.clearUserInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default http



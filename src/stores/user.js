// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'


export const useUserStore = defineStore('user', () => {
    const cartStore  = useCartStore()
    // 1.定义管理数据的state
    const userInfo = ref({})
    // 2.定义管理数据接口的action函数(登录)
    const getUserInfo = async ({ account, password }) => {
       const res = await loginAPI({ account, password })
       userInfo.value = res.result
    //    合并购物车操作(登录前添加的物品与登录后合并)
    await mergeCartAPI(cartStore.cartList.map(item => {
        return {
            skuId:item.skuId,
            selected:item.selected,
            count:item.count
        }
    }))
    cartStore.updateNewlist()
    }

    // 3.退出时清除信息
    const clearUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCart()
    }

    // 3.以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
}, {
    persist: true,
}
)
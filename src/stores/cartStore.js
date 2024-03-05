// 封装购物车模块
import { defineStore } from "pinia"
import { ref } from 'vue'
import { computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  const cartList = ref([])

  // 获取最新购物车列表
  const updateNewlist = async () => {
    // 获取最新列表接口
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

  // 购物车添加
  const addCart = async (goods) => {
    const { skuId, count } = goods
    // 登录之后的逻辑
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      // 获取最新购物车 
      updateNewlist()
    } else {
      // 未登录的逻辑：
      // 添加购物车操作
      // 已添加过 count+1
      // 没添加过 直接push
      // 思路：通过匹配传递过来的商品对象skuId能否在cartList中找到
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }

  }
  // 购物车删除
  const delCart = async (skuId) => {
    // 登录之后的逻辑
    if (isLogin.value) {
      // 调删除接口
      await delCartAPI([skuId])
      // 获取最新列表接口
      updateNewlist()
    } else {
      // 未登录逻辑：
      // 1.找到要删除的下标值 -splice
      // 2.使用数组的过滤方法 - filter
      const index = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(index, 1)
    }
  }
  
  // 购物车清除
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }

  // 判断是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  // 计算属性
  // 1.总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2.总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  // 3.已选择的数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4.已选择商品价格合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))


  return {
    cartList,
    allCount,
    allPrice,
    selectedCount,
    selectedPrice,
    isAll,
    updateNewlist,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart
  }
}, {
  persist: true,
})

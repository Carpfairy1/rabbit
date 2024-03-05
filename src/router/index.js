import { createRouter, createWebHistory } from 'vue-router'
import login from "@/views/login/index.vue"
import layout from "@/views/layout/index.vue"
import home from "@/views/home/index.vue"
import category from "@/views/category/index.vue"
import SubCategory from "@/views/SubCategory/index.vue"
import Detail from "@/views/Detail/index.vue"
import CartList from "@/views/CartList/index.vue"
import Checkout from "@/views/Checkout/index.vue"
import Pay from "@/views/Pay/index.vue"
import Payback from "@/views/Pay/Payback.vue"
import Member from "@/views/Member/index.vue"
import MemberInfo from '@/views/Member/components/UserInfo.vue'
import MemberOrder from '@/views/Member/components/UserOrder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置path和component对应关系的位置
  routes: [
    {
      path:'/',
      component:layout,
      children: [
        {
          path:'',
          component:home
        },
        {
          path:'category/:id',
          component:category
        },
        {
          path:'category/sub/:id',
          component:SubCategory
        },
        {
          path:'detail/:id',
          component:Detail
        },
        {
          path:'cartlist',
          component:CartList
        },
        {
          path:'checkout',
          component:Checkout
        },
        {
          path:'pay',
          component:Pay
        },
        {
          path:'paycallback',
          component:Payback
        },
        {
          path:'member',
          component:Member,
          children: [
            {
              path: 'user',
              component: MemberInfo
            },
            {
              path: 'order',
              component: MemberOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:login
    }
   
  ],
  // 路由切换自动回到顶部
  scrollBehavior () {
  return {
    top : 0
  }
  }
})

export default router

// 封装所有和用户相关的接口函数
import http from '@/utils/http'

export const loginAPI = ({ account, password }) => {
    return http({
    url:'/login',
    method:'POST',
    data:{
        account,
        password
    }
    })
}
// 猜你喜欢接口
export const getLikeListAPI = ({ limit = 4 }) => {
    return http({
      url:'/goods/relevant',
      params: {
        limit 
      }
    })
  }

  /*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

// 获取订单接口
export const getUserOrder = (params) => {
    return http({
      url:'/member/order',
      method:'GET',
      params
    })
  }
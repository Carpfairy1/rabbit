import http from "@/utils/http"


export const getCheckoutInfoAPI = () => {
    return http ({
        url:'/member/order/pre'
    })
    }


// 创建订单
export const createOrderAPI = (data) => {
  return http({
    url: '/member/order',
    method: 'POST',
    data
  })
}
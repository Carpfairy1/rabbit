import http  from '@/utils/http'

export const getBannerAPI = (params = {}) => {
  const {distributionSite = '1'} = params
    return http({
         url: '/home/banner',
         params: {
          distributionSite
         }
     })
    }

    /**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return http({
      url:'/home/new'
    })
  }

  export const findHotAPI = () => {
    return http({
      url:'/home/hot'
    })
  }

  export const getGoodsAPI = () => {
    return http({
      url: '/home/goods'
    })
  }


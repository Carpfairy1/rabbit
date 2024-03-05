import { getBannerAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'


export const useBanner = () => {
const bannerList = ref([])
const getBanner = async () => {
        const res = await getBannerAPI({
          distributionSite:'2'
        })        
        bannerList.value = res.result
    }
onMounted(() => getBanner())
// 封装函数需要return出需要用的数据
return {
    bannerList
}
}
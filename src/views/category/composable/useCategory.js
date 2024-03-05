import { useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category'
import { onMounted,ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

export const useCategory = () => {
    const categoryData = ref({})
const route = useRoute()
const getCategory = async (id = route.params.id) => {
   const res = await getCategoryAPI(id)
   categoryData.value = res.result
}
onMounted(() => getCategory())
onBeforeRouteUpdate((to) => {
  // 需要使用最新的数据
  getCategory(to.params.id)
})

return {
    categoryData
}
}

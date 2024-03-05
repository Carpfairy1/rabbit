// 封装倒计时逻辑函数
import { computed, onUnmounted, ref } from "vue"
import  dayjs  from 'dayjs'
export const useCountDown = () => {
    // 响应式数据
    const time = ref(0)
    // 格式化时间 为xx分xx秒
    // 使用计算属性
   const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 开启倒计时函数
    let timer = null
    const start = (currentTime) => {
    //  开始倒计时的逻辑
    // 每隔一秒减1秒
    time.value = currentTime
    setInterval(()=>{
        time.value--
    },1000)
    }
    // 销毁时清除定时器
    onUnmounted(() => {
    timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}
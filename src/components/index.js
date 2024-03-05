// 把所有组件进行全局化注册
import ImageView  from './ImageView/index.vue'
import XtxSkuSku from './XtxSku/index.vue'


export const componentPlugin = {
    install (app) {
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', XtxSkuSku)
    }
}
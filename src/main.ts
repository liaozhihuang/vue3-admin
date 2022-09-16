import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { components, plugins } from './plugins/element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import './assets/css/icon.css'


// 导入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 

// import zhCn from 'element-plus/es/locale/lang/zh-cn'





const app = createApp(App)

app.use(ElementPlus)
// components.forEach(component => {
//   app.component(component.name, component)
// })

// plugins.forEach(plugin => {
//   app.use(plugin)
// })

// element-plus按需引入方式下，全局修改组件大小

// app.use(ElementPlus, {
//   locale: zhCn,
// })
app.config.globalProperties.$ELEMENT = {
  size: 'small'
}
app.use(store).use(router).mount('#app')

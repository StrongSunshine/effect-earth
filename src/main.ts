import { createApp } from 'vue'

import App from './App.vue'
import Router from './router'
import Store from './store'

import { createDesignSize } from '@/utils/resize/designSize'
const designSize = createDesignSize()

/** animate动画框架 */
import 'animate.css/animate.compat.css';
/** unocss */
import '@unocss/reset/tailwind.css'
import 'uno.css'
/* NProgress */
import 'nprogress/nprogress.css'
/* 自定义样式 */
import '@/assets/styles/index.scss'

createApp(App)
  .use(Router)
  .use(Store)
  .use(designSize)
  .mount('#app')

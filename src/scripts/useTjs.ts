/*
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-05-23 16:48:28
 * @Description: 创建3维场景
 */

import { useAppSore } from '@/store'
import init from './init'

export default function () {
  const store = useAppSore()

  onMounted(() => {
    uino.app = new THING.App({
      skyBox: 'BlueSky',
      url: 'https://www.thingjs.com/static/models/factory'
    })

    uino.app.on(THING.EventType.Load, ({ campus }) => {
      uino.app.level.change(campus)
      /* 初始化场景的一些操作 */
      init()
    })

    uino.app.on('campusready', () => {
      /* 变更场景加载状态 */
      store.updateLoaded(true)
    })
  })
}

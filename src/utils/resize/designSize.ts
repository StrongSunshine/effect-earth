/*
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-07-08 12:42:53
 * @Description: 获取设计尺寸
 */

import { inject, readonly } from 'vue'

import type { InjectionKey, App } from 'vue'

export const designSizeKey: InjectionKey<Size> = Symbol()

export const createDesignSize = () => {
  const designSize = readonly<Size>({
    width: 1920,
    height: 1080
  })

  return {
    install(app: App) {
      app.provide(designSizeKey, designSize)
    }
  }
}

export const useDesignSize = (): Size => inject(designSizeKey)!

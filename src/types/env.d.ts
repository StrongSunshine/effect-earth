/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * @description: string转联合类型
 * @example:
 * 'hello' -> 'h'|'e'|'l'|'l'|'o'
 */
declare type StringToUnion<S extends string, U extends string = never> =
  S extends `${infer H}${infer L}` ?
  StringToUnion<L, H | U> :
  U

/* vite.config.js 全局变量 */
declare const __DEV__: boolean

/* 用户全局变量 */
declare const uino: Uino

interface Config {
  dixApi: string
}

interface Uino {
  app: THING.App
  map: CMAP.Map
  config: Config
}

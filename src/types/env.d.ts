/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
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

declare type Nullable<T> = T | null

/* vite.config.js 全局变量 */
declare const __DEV__: boolean

declare const uino: Uino

interface Config {
  dixApi: string
}

interface Uino {
  app: THING.App
  map: CMAP.Map
  config: Config
}

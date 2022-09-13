/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-14 09:33:45
 * @Description: unocss
 */

import {
  defineConfig,
  /* 默认编译库，相当于presetWind */
  presetUno,
  /* 编译属性，否则只可以使用class */
  presetAttributify,
  /* 编译 @apply */
  transformerDirectives,
  /* 编译 group hover:(text-gray-900...) */
  transformerVariantGroup,
} from 'unocss'

/* 滚动条 */
import { presetScrollbar } from 'unocss-preset-scrollbar'
/* rem2px */
import remToPxPreset from './plugin/preset-remo-to-px'

import type { Rule } from 'unocss';

/* 自定义样式类---文本渲染 */
function textRendering(): Rule[] {
  return [
    'auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision'
  ].map(i => ([
    /* layer和tailwindcss一致：base, components, utilities */
    `text-r-${i}`, { 'text-rendering': i }, { layer: 'base' }
  ]))
}

export default defineConfig({
  theme: {
    colors: {
      primary: '#202A38',
    },
    fontFamily: {
      DIN: ["'DINPro'"],
    },
  },
  shortcuts: [
    ['apply-bg-full', 'bg-center bg-no-repeat bg-full'],
    ['wrap-full', 'w-full h-full'],
    ['flex-center', 'flex items-center justify-center'],
    ['flex-around', 'flex items-center justify-around'],
    ['flex-between', 'flex items-center justify-between'],
  ],
  rules: [
    ...textRendering(),
    ['bg-full', { 'background-size': '100% 100%' }, { layer: 'base' }],
  ],
  variants: [],
  /* 用于提前编译，以便于动态使用 p-${size}*/
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    remToPxPreset(),
    presetScrollbar({
      /* 默认的滚动条宽度 */
      scrollbarWidth: '8px',
      /* 默认的滚动条高度 */
      scrollbarHeight: '8px',
      /* 默认的滚动条轨迹的圆角 */
      scrollbarTrackRadius: '4px',
      /* 默认的滚动条滑块的圆角 */
      scrollbarThumbRadius: '4px',
      /* 默认的滚动条轨迹的背景色 */
      scrollbarTrackColor: 'transparent',
      /* 默认的滚动条滑块的背景色 */
      scrollbarThumbColor: '#666',
      /* 捕获到的数字转化成单位的方法 */
      numberToUnit: value => `${value}px`,
      /* 该预设生成的css变量的前缀 */
      varPrefix: ''
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})

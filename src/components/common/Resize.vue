<!--
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-14 16:44:58
 * @Description: 自适应组件
-->

<template>
  <div :style="style" absolute inset-0 origin-top-left>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup name="Resize">
import computeNewCoord from '@/utils/resize/resize-computed'
import { useDesignSize } from '@/utils/resize/designSize'

interface ResizeProps {
  width?: number | string
  height?: number | string
  left?: number | string
  top?: number | string
  constraints?: StringToUnion<'123456789'>
  event?: 'none' | 'auto' | 'all'
}

const props = withDefaults(defineProps<ResizeProps>(), {
  width: 100,
  height: 100,
  left: 0,
  top: 0,
  constraints: '1',
  event: 'all'
})

/**
 * @description: 设计尺寸
 */
const designSize = useDesignSize()

/**
 * @description: 屏幕尺寸
 */
const screenSize = useWindowSize()

/**
 * @description: 计算最终样式
 */
const style = computed(() => {
  const { left, top, ratio } = computeNewCoord(
    {
      constraints: Number(props.constraints),
      left: Number(props.left),
      top: Number(props.top),
      width: screenSize.width.value,
      height: screenSize.height.value
    },
    designSize
  )

  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    transform: `translate(${left}px, ${top}px) scale(${ratio})`,
    pointerEvents: props.event
  }
})
</script>

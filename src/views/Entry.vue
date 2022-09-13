<!--
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-07-08 16:01:15
 * @Description: 业务栏
-->
<template>
  <resize width="400" height="1002" left="0" top="70" constraints="4">
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
      appear
    >
      <component :is="panelMap.get(menu)?.left"></component>
    </transition>
  </resize>
  <resize width="400" height="1002" left="1520" top="70" constraints="6">
    <transition
      enter-to-class="animated fadeInRight"
      leave-to-class="animated fadeOutRight"
      appear
    >
      <component :is="panelMap.get(menu)?.right"></component>
    </transition>
  </resize>
</template>

<script lang="ts" setup>
import { useAppSore } from '@/store'

import FirstLeft from './firstScreen/Left.vue'
import FirstRight from './firstScreen/Right.vue'

const { menu } = storeToRefs(useAppSore())

const panelMap = new Map([
  [
    'video',
    {
      left: FirstLeft,
      right: FirstRight
    }
  ]
])
</script>

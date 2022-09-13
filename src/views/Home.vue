<!--
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-07-08 15:50:21
 * @Description: Description
-->
<template>
  <div id="div3d"></div>
  <div w-full h-full absolute inset-0 pointer-events-none v-if="loaded">
    <Entry />
  </div>
</template>

<script lang="ts" setup>
import { useAppSore } from '@/store'
import useTjs from '@/scripts/useTjs'
import Entry from './Entry.vue'

useTjs()

const { loaded } = storeToRefs(useAppSore())
</script>

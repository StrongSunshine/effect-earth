<!--
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-09-13 15:23:57
 * @Description: Description
-->
<template>
  <div w-full h-full absolute inset-0 ref="div">

  </div>
</template>

<script lang="ts" setup>
import { earth } from '@/earth'
const div = ref<HTMLDivElement>()

onMounted(() => {
  const container = unref(div)
  container && earth(container)
})
</script>

<style>
#div3d {
}
</style>

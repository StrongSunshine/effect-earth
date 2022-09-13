<!--
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-05-24 10:55:46
 * @Description: 标题
-->

<template>
  <div w-full mt-20px text-primary text-20px leading-28px font-bold relative>
    <span class="title-tri" ml-44px><slot></slot></span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.title-tri {
  &:before {
    position: absolute;
    left: 30px;
    top: 8px;
    content: '';
    border: 5.5px solid transparent;
    border-left: 5.5px solid #202a38;
    border-right: 0;
  }
  &:after {
    position: absolute;
    left: 25px;
    top: 8px;
    content: '';
    border: 5.5px solid transparent;
    border-left: 5.5px solid #202a38;
    border-right: 0;
    opacity: 0.39;
  }
}
</style>

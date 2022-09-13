/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-14 16:54:59
 * @Description: store-app
 */
import { defineStore } from 'pinia';

const useAppSore = defineStore('app', {
  state: () => ({
    loaded: false,
    menu: 'video'
  }),

  actions: {
    updateLoaded(bol: boolean) {
      this.loaded = !!bol;
    },
    updateMenu(bol: string) {
      this.menu = bol;
    },
  },
});

export { useAppSore }

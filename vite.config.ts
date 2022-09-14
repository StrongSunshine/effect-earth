/// <reference types="vitest" />

import { defineConfig } from 'vite'

import path from 'path'

import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

// 库自动引入
import AutoImport from 'unplugin-auto-import/vite'
// 组件自动引入
import Components from 'unplugin-vue-components/vite'

export default ({ mode }: {
	mode: string
	command: string
}) => defineConfig({
	resolve: {
		alias: {
			'@/': `${path.resolve(__dirname, 'src')}/`
		}
	},
	define: {
		__DEV__: mode === 'development'
	},
	plugins: [
		vue({
			reactivityTransform: true
		}),
		AutoImport({
			imports: ['vue', '@vueuse/core', 'pinia'],
			dts: './src/types/auto-imports.d.ts'
		}),
		Components({
			dts: './src/types/components.d.ts'
		}),
		Unocss()
	],
	build: {
		rollupOptions: {
			output: {
				// echarts包较大，单独打包成一个 chunk
				manualChunks: { echarts: ['echarts'] },
			},
		},
	},
	test: {
		// https://github.com/vitest-dev/vitest
		environment: 'jsdom'
	},
	server: {
		proxy: {
			'/prod-api': {
				changeOrigin: true,
				target: 'http://180.138.89.3:81',
			}
		}
	}
})

/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-15 11:31:33
 * @Description: 接口
 */

import { createFetch } from '@vueuse/core'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

interface ErrorMessage {
    [propName: number]: string;
}

const DixApi = uino.config.dixApi

const errorMessage: ErrorMessage = {
    400: '请输入合法的查询条件！',
    401: '您的登录已超时，请重新登录',
    403: '参数错误',
    404: '资源不存在',
    417: '未绑定登录账号，请使用密码登录后绑定',
    423: '演示环境不能操作，如需了解联系冷冷',
    426: '用户名不存在或密码错误',
    428: '验证码错误,请重新输入',
    429: '请求过频繁',
    479: '演示环境，没有权限操作',
    500: '请求服务器出错',
    502: '请求服务器失败',
};

const useFetch = createFetch({
    baseUrl: __DEV__ ? '' : DixApi,
    options: {
        timeout: 10000,
        async beforeFetch({ url, options }) {
            NProgress.start()
            /* 添加token */
            // const myToken = await getToken()

            // options.headers = {
            //     ...options.headers,
            //     Authorization: `Bearer `
            // }

            return { options }
        },
        afterFetch(ctx) {
            NProgress.done()
            /* 登录超时跳转 */
            // const { code } = ctx.data

            // if (code === 401) window.location.replace('/login')

            return ctx
        },
        onFetchError(ctx) {
            NProgress.done()
            /* 请求错误打印错误信息 */
            const defaultErrorMsg = '网络错误'
            const { data } = ctx

            data && data.status && console.log(errorMessage[data.status] || defaultErrorMsg);

            return ctx
        }
    },
    fetchOptions: {
        mode: 'cors',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
    },
})

export default useFetch

/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-15 11:22:51
 * @Description: 接口
 */

import useFetch from "./fetch";

import type { UseFetchOptions } from '@vueuse/core'
import type { LoginQuery } from '@/definition/api.type'

export const login = (data: LoginQuery, options: UseFetchOptions = {}) => {
    return useFetch('/prod-api/apiLogin', options).post(data).json()
}

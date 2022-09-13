/*
 * @Author: strong sunshine
 * @LastEditors: strong sunshine
 * @LastEditTime: 2022-05-11 14:21:41
 * @Description: util类型定义
 */

declare type PollArg = {
    fn: () => any
    validate: (arg: any) => boolean
    interval?: number
    maxAttempts?: number
}

declare type PromiseCallback = (value: unknown) => void

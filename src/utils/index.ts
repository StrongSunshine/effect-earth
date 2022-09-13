/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-13 16:54:44
 * @Description: 工具类
 */

/**
 * 给数值添加千位分隔符
 * @param value 值
 * @returns 格式化后的值
 */
function formatThousandDigit(value: string | number) {
  return value
    .toString()
    .replace(/\d+/, (n) => n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => $1 + ','));
}

/**
 * @description: 延时
 * @param {number} ms 时间-毫秒
 * @return {*} promise
 */
function delay(ms: number): Promise<undefined> {
  return new Promise(r => setTimeout(r, ms))
}

/**
 * @description: 给定次数的校验
 * @param {PollArg} param1
 * @return {Promise<unknown>} 校验结果
 */
async function poll({ fn, validate, interval = 0, maxAttempts }: PollArg) {
  let attempts = 0

  const executePoll = async (resolve: PromiseCallback, reject: PromiseCallback) => {
    const result = await fn()
    attempts++

    if (validate(result))
      resolve(result)
    else if (maxAttempts && attempts === maxAttempts)
      return reject(new Error('Exceeded max attempts'))
    else
      setTimeout(executePoll, interval, resolve, reject)
  }

  return new Promise(executePoll)
}

export {
  formatThousandDigit,
  delay,
  poll
}

/**
 * @description: 获取圆上分布均匀的点
 */
export function getCirclePoints(option: {
  /* 圆半径 */
  radius: number
  /* 获取点数 */
  number: number
  /* 是否闭合 */
  closed: boolean
}) {
  const list = [];
  for (let j = 0; j < 2 * Math.PI - 0.1; j += (2 * Math.PI) / (option.number || 100)) {
    list.push([
      parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
      0,
      parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2)),
    ]);
  }
  if (option.closed) list.push(list[0]);
  return list;
}

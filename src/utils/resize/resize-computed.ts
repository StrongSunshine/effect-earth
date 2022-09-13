/*
 * @Author: strong sunshine
 * @Change: strong sunshine
 * @Date: 2022-04-14 16:42:47
 * @Description: resize相关
 */

enum ContainerConstraints {
  TOPLEFT = 1,
  TOPCENTER,
  TOPRIGHT,
  CENTERLEFT,
  CENTERCENTER,
  CENTERRIGHT,
  BOTTOMLEFT,
  BOTTOMCENTER,
  BOTTOMRIGHT,
}

/**
 * @description 根据屏幕尺寸计算9点参照点位置
 */
function computeCoord(w: number, h: number) {
  return [
    [0, 0],
    [w / 2, 0],
    [w, 0],
    [0, h / 2],
    [w / 2, h / 2],
    [w, h / 2],
    [0, h],
    [w / 2, h],
    [w, h],
  ]
}

/**
 * @description 获取新老布局的9点参照物位置
 */
function getCoord(nw: number, nh: number, w: number, h: number) {
  return [computeCoord(w, h), computeCoord(nw, nh)]
}

/**
 * @description 按照新老画布尺寸和元素的constraints参照物目标计算新的放缩比例
 * @param {number} constraints 元素look的目标，一定是9点之一
 * @param {object} newSize 具有w,h属性的新画布尺寸
 * @param {*} oldSize 具有w,h属性的老画布尺寸
 */

function getElRatio(constraints: number, newSize: Size, oldSize: Size) {
  let ratio = 1
  const cd = ContainerConstraints
  // 垂直缩放参照点
  const verticalCD = [cd.TOPLEFT, cd.CENTERLEFT, cd.BOTTOMLEFT, cd.TOPRIGHT, cd.CENTERRIGHT, cd.BOTTOMRIGHT]

  // 水平缩放参照点
  const horizontalCD = [cd.TOPCENTER, cd.BOTTOMCENTER]

  if (verticalCD.includes(constraints)) {
    ratio = newSize.height / oldSize.height
    return ratio
  }

  // 当宽高比与设计尺寸不一样时以宽度缩放、否则还是以高度缩放
  if (horizontalCD.includes(constraints)) {
    if (newSize.width === oldSize.width) return ratio
    if (newSize.width / newSize.height < oldSize.width / oldSize.height) {
      ratio = newSize.width / oldSize.width
      return ratio
    } else {
      ratio = newSize.height / oldSize.height
      return ratio
    }
  }

  if (constraints === cd.CENTERCENTER) {
    ratio = (newSize.width / oldSize.width + newSize.height / oldSize.height) / 2
    return ratio
  }

  return ratio
}

/**
 * @description: 按新9点对应到老9点的变化比例计算新位置
 * @param {*} resizeEl 需要自适应的元素
 * @param {*} canvasSize 设计图尺寸
 */
export default function computeNewCoord(resizeEl: ResizeEl, canvasSize: Size) {
  const { constraints, width, height, left: x, top: y } = resizeEl
  const newSize = {
    width,
    height,
  }

  // 获取调整到新布局后的元素放缩比例
  const ratio = getElRatio(constraints, newSize, canvasSize)

  // 计算top left的差值
  const [oldTargetCoord, newTargetCoord] = getCoord(
    resizeEl.width,
    resizeEl.height,
    canvasSize.width,
    canvasSize.height,
  )
  const leftDiff = (oldTargetCoord[constraints - 1][0] - x) * ratio
  const topDiff = (oldTargetCoord[constraints - 1][1] - y) * ratio

  // 按照差值计算新的top和left
  const left = newTargetCoord[constraints - 1][0] - leftDiff
  const top = newTargetCoord[constraints - 1][1] - topDiff

  return {
    left,
    top,
    ratio,
  }
}

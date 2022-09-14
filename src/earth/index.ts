// 6371004地球半径
import { Group } from 'three'

import { init } from './init'
import { createEarth, type EarthInterface } from './earth'
import { createStar, type StarInterface } from './star'

export type Config = EarthInterface & StarInterface

export async function earth(container: HTMLDivElement, arg: Config) {
  const config = {
    earthRadius: 6371004,
    scanTime: 100,
    starRadius: 50000000,
    starCount: 5000,
    starSize: 100000,
  }

  let key: keyof Config
  for (key in arg) {
    if (arg[key] !== null || arg[key] !== undefined) {
      config[key] = arg[key]
    }
  }

  /* 初始化场景 */
  const {
    scene, camera, renderer, control
  } = init(container)

  /* 根节点 */
  const group = new Group()
  group.name = "group";
  group.position.set(0, 0, 0)

  /* 地球节点 */
  const earthGroup = new Group()
  group.add(earthGroup)
  earthGroup.name = "EarthGroup";

  /* 创建地球 */
  const [earth, points] = await createEarth({
    earthRadius: config.earthRadius,
    scanTime: config.scanTime
  })
  earthGroup.add(earth, points)

  /* 创建星星 */
  const star = await createStar({
    starRadius: config.starRadius,
    starCount: config.starCount,
    starSize: config.starSize
  })
  earthGroup.add(star)

  scene.add(group)

  const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    control.update()
  }
  render()
}

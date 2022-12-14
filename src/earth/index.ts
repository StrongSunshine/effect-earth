// 6371004地球半径
import { Group } from 'three'

import { init } from './init'
import { createEarth, type EarthInterface } from './earth'
import { createStar, type StarInterface } from './star'
import { createGlow, type GlowInterface } from './glow'
import { createAtmosphere } from './atmosphere'
import { createSatellite, type SatelliteInterface } from './satellite'

export type Config = EarthInterface & StarInterface & GlowInterface & SatelliteInterface

export async function earth(container: HTMLDivElement, arg: Config) {
  const config = {
    earthRadius: 6371004,
    scanTime: 10000,
    starRadius: 6371004 * 2,
    starCount: 2000,
    starSize: 6371004 / 100,
    glowOpacity: 0.7,
    satelliteCount: 3,
    satelliteSize: 6371004 / 50,
    trackSegments: 48 * 3,
    trackRadius: 6371004 / 1000
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

  /* root节点 */
  const earthGroup = new Group()
  earthGroup.position.set(0, 0, 0)
  earthGroup.name = "EarthGroup";
  scene.add(earthGroup)

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

  /* 创建发光效果 */
  const glow = await createGlow({
    earthRadius: config.earthRadius,
    glowOpacity: config.glowOpacity
  })
  earthGroup.add(glow)

  /* 创建大气效果 */
  const atmosphere = await createAtmosphere(config.earthRadius)
  earthGroup.add(atmosphere)

  /* 创建卫星 */
  const satellites = await createSatellite({
    earthRadius: config.earthRadius,
    satelliteCount: config.satelliteCount,
    satelliteSize: config.satelliteSize,
    trackSegments: config.trackSegments,
    trackRadius: config.trackRadius,
  })
  earthGroup.add(...satellites)

  const render = () => {
    requestAnimationFrame(render)
    /* 地球公转 */
    earthGroup.rotateY(-0.001);
    /* 卫星旋转 */
    satellites.forEach((s) => {
      s.rotateY(Math.random() * 0.01);
    });

    renderer.render(scene, camera)
    control.update()
  }
  render()
}

// 6371004地球半径
import { Group } from 'three'

import { init } from './init'
import { createEarth } from './earth'

export async function earth(container: HTMLDivElement) {
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

  const [earth, points] = await createEarth()
  earthGroup.add(earth, points)

  scene.add(group)

  const render = () => {
    requestAnimationFrame(render)
    renderer.render(scene, camera)
    control.update()
  }
  render()
}

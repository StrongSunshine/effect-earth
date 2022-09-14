import { Vector3, Points, BufferGeometry, BufferAttribute, PointsMaterial } from 'three'

import { loadTexture } from './textureLoader'
import StarTexture from '@/assets/earth/gradient.png'

export interface StarInterface {
  /* 星星分布半径 */
  starRadius: number
  /* 星星个数 */
  starCount: number
  /* 星星大小 */
  starSize: number
}

export async function createStar(config: StarInterface) {
  const vertices = []
  const starTexture = await loadTexture(StarTexture)

  /* 随机500星星 */
  for (let i = 0; i < config.starCount; i++) {
    const vertex = new Vector3();
    vertex.x = config.starRadius * 3 * Math.random() - config.starRadius * 1.5;
    vertex.y = config.starRadius * 3 * Math.random() - config.starRadius * 1.5;
    vertex.z = config.starRadius * 3 * Math.random() - config.starRadius * 1.5;
    vertices.push(vertex.x, vertex.y, vertex.z);
  }

  // 生成几合体
  const around = new BufferGeometry()
  around.setAttribute("position", new BufferAttribute(new Float32Array(vertices), 3));
  around.setAttribute("color", new BufferAttribute(new Float32Array(config.starCount), 3));

  /* 顶点材质 */
  const aroundMaterial = new PointsMaterial({
    size: config.starSize,
    sizeAttenuation: true, // 尺寸衰减
    color: 0x4d76cf,
    transparent: true,
    opacity: 1,
    map: starTexture,
  });

  const aroundPoints = new Points(around, aroundMaterial);
  aroundPoints.name = "star";
  aroundPoints.position.set(0, 0, 0)

  return aroundPoints
}

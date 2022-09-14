import { SpriteMaterial, Sprite } from 'three'

import { loadTexture } from './textureLoader'
import GlowTexture from '@/assets/earth/glow.png'

export interface GlowInterface {
  /* 地球半径 */
  earthRadius: number
  /* 光晕透明度 */
  glowOpacity: number
}

export async function createGlow(config: GlowInterface) {
  const R = config.earthRadius;
  const glowTexture = await loadTexture(GlowTexture)

  // 创建精灵材质对象SpriteMaterial
  const spriteMaterial = new SpriteMaterial({
    map: glowTexture,
    color: 0x4390d1,
    transparent: true,
    opacity: config.glowOpacity,
    depthWrite: false,
  });

  // 创建表示地球光圈的精灵模型
  const sprite = new Sprite(spriteMaterial);
  // 适当缩放精灵
  sprite.scale.set(R * 3, R * 3, 1);

  return sprite
}

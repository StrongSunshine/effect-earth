import {
  Mesh,
  Color,
  Points,
  SphereGeometry,
  ShaderMaterial,
  PointsMaterial
} from 'three'

import { loadTexture } from './textureLoader'
import EarthTexture from '@/assets/earth/earth.jpg'
import earthVertex from './shaders/vertex'
import earthFragment from './shaders/fragment'

export interface EarthInterface {
  /* 地球半径 */
  radius?: number
  /* 扫光时间 */
  scanTime?:number
}

export async function createEarth(arg?: EarthInterface) {
  const config = {
    radius: 6371004,
    scanTime: 100,
    ...arg
  }

  const earthTexture = await loadTexture(EarthTexture)

  const uniforms = {
    glowColor: {
      value: new Color(0x0cd1eb),
    },
    scale: {
      type: "f",
      value: -1.0,
    },
    bias: {
      type: "f",
      value: 1.0,
    },
    power: {
      type: "f",
      value: 3.3,
    },
    time: {
      type: "f",
      value: config.scanTime,
    },
    isHover: {
      value: false,
    },
    map: {
      value: earthTexture,
    },
  }

  const earth_geometry = new SphereGeometry(
    config.radius,
    50,
    50
  );

  const earth_border = new SphereGeometry(
    config.radius * 1.05,
    60,
    60
  );

  const pointMaterial = new PointsMaterial({
    color: 0x81ffff,
    transparent: true,
    opacity: 0.1,
    vertexColors: false,
    // 定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
    size: 1,
    // 定义粒子的大小。默认为1.0
  })
  const points = new Points(earth_border, pointMaterial);

  const earth_material = new ShaderMaterial({
    // wireframe:true, // 显示模型线条
    uniforms: uniforms,
    vertexShader: earthVertex.join('\n'),
    fragmentShader: earthFragment.join('\n'),
  });
  earth_material.needsUpdate = true;

  const earth = new Mesh(earth_geometry, earth_material);
  earth.name = "earth";

  return [earth, points]
}

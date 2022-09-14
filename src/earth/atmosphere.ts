import { Color, ShaderMaterial, SphereGeometry, NormalBlending, Mesh } from 'three'

import airVertex from "./shaders/airVertex";
import airFragment from './shaders/airFragment';

export async function createAtmosphere(radius: number) {
  // 大气层配置
  const AeroSphere = {
    uniforms: {
      coefficient: {
        type: "f",
        value: 1.0,
      },
      power: {
        type: "f",
        value: 2,
      },
      glowColor: {
        type: "c",
        value: new Color(0x4390d1),
      },
    },
    vertexShader: airVertex.join('\n'),
    fragmentShader: airFragment.join('\n')
  };

  // 球体 辉光 大气层
  const material1 = new ShaderMaterial({
    uniforms: AeroSphere.uniforms,
    vertexShader: AeroSphere.vertexShader,
    fragmentShader: AeroSphere.fragmentShader,
    blending: NormalBlending,
    transparent: true,
    depthWrite: false,
  });

  const sphere = new SphereGeometry(radius, 50, 50);
  const mesh = new Mesh(sphere, material1);

  return mesh
}

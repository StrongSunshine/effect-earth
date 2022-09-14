import { DoubleSide, MeshBasicMaterial, Mesh, CatmullRomCurve3, Vector3, TubeGeometry, SphereGeometry } from 'three'
import { getCirclePoints } from './utils'

export interface SatelliteInterface {
  /* 地球半径 */
  earthRadius: number
  /* 每条轨道有几个卫星 */
  satelliteCount: number
  /* 卫星大小 */
  satelliteSize: number
  /* 卫星轨道分段数 */
  trackSegments: number
  /* 卫星轨道半径 */
  trackRadius: number
}

export async function createSatellite(config: SatelliteInterface) {
  // 创建 圆环 点
  const list = getCirclePoints({
    radius: config.earthRadius * 1.5,
    number: 150, //切割数
    closed: true, // 闭合
  }).map(p => new Vector3(...p))

  // 轨道材质
  const material = new MeshBasicMaterial({
    color: 0x098fb3,
    transparent: true,
    opacity: 0.4,
    side: DoubleSide,
  });

  // 轨道
  const curve = new CatmullRomCurve3(list);
  const tubeGeometry = new TubeGeometry(
    curve,
    /* 分段数 */
    config.trackSegments,
    /* 管线半径 */
    config.trackRadius,
    16
  );
  const line = new Mesh(tubeGeometry, material);

  // 再clone两条轨道出来
  const l2 = line.clone();
  l2.scale.set(1.2, 1.2, 1.2);
  l2.rotateZ(Math.PI / 6);

  const l3 = line.clone();
  l3.scale.set(0.8, 0.8, 0.8);
  l3.rotateZ(-Math.PI / 6);

  line.name = l2.name = l3.name = '卫星轨道'

  // 卫星
  const balls = ["#e0b187", "#628fbb", "#806bdf"].map(color => {
    const ball = new Mesh(
      new SphereGeometry(config.satelliteSize, 32, 32),
      new MeshBasicMaterial({
        color
      })
    );
    ball.name = "卫星";
    return ball
  })

  // 一根线上总共有几个球，根据数量平均分布一下
  for (let i = 0; i < config.satelliteCount; i++) {
    const ball01 = balls[0].clone();
    const num = Math.floor(list.length / config.satelliteCount)

    ball01.position.copy(list[num * (i + 1)]);
    line.add(ball01);

    const ball02 = balls[1].clone();
    ball02.position.copy(list[num * (i + 1)]);
    l2.add(ball02);

    const ball03 = balls[2].clone();
    ball03.position.copy(list[num * (i + 1)]);
    l3.add(ball03);
  }

  return [line, l2, l3]
}

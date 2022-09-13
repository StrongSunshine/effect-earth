export default function useLimitCamera() {

  const app = THING.App.current

  // 视野
  app.camera.fov = 45
  // 摄像机垂直角度范围
  app.camera.xAngleLimitRange = [10, 90]
  // 摄像机距离范围
  app.camera.distanceLimited = [6, 160]
}

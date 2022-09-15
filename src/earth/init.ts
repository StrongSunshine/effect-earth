import {
  Color,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function init(container: HTMLDivElement) {
  const { width, height } = container.getBoundingClientRect()

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  container.appendChild(canvas)

  const scene = new Scene()
  scene.background = new Color('#020824')

  const camera = new PerspectiveCamera(45, width / height, 1, 50010000)
  camera.position.set(7316678, 14398627, 21324875)

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })

  const control = new OrbitControls(camera, renderer.domElement)
  control.enableZoom = true
  control.enableDamping = true
  control.dampingFactor = 0.05
  control.maxDistance = 50000000

  window.addEventListener('resize', () => {
    if (!container.parentElement) return
    const { width, height } = container.parentElement.getBoundingClientRect()
    renderer.setSize(width, height, true)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  })

  return {
    scene, camera, renderer, control
  }
}

import { 
  WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, Raycaster, Vector2
} from 'three'
import { OrbitControls } from './OrbitControls'
import { onClick, onWindowResize } from './utils/listeners'
import { createSphere, getSpheres, isSphere, sphereOnClick } from './utils/geometry'
import { getCanvasHeight, updateSphereCount } from './utils/htmlUtils'
import { initConfig } from './config/initConfig'

const { canvasWidth } = initConfig
const { innerWidth, innerHeight } = window

const init = () => {
  const renderer = new WebGLRenderer({ 
    antialias: true, 
    canvas: document.getElementById('canvas-main') 
  })
  const raycaster = new Raycaster()
  const scene = new Scene()
  const pointer = new Vector2()
  const camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    1000
  )
  const ambientLight = new AmbientLight(0xFFFFFF)
  const directionalLight = new DirectionalLight(0xFFBFFF, 1.9)
    
  renderer.setSize(canvasWidth, getCanvasHeight())
  directionalLight.position.set(-30, 20, 10)
  camera.position.set(-10, 30, 30)

  scene.add(ambientLight)
  scene.add(directionalLight)

  return {
    renderer,
    camera,
    scene,
    raycaster,
    pointer
  }
}

const animate = ({ renderer, camera, scene }) => {
  const spheres = getSpheres(scene)

  spheres.forEach((item, i) => {
    let speed = 0.01
    let turn = !!i

    item.step += speed
    item.position.y = Math.abs(Math.sin(item.step) * 10)
    item.position.x = Math.sin(item.step) * (turn ? 10 : -10)
    
    if (Math.sin(item.step) == 1 ) turn = !!turn
  })
  
  renderer.render(scene, camera)
}

export const createScene = () => {
  // TODO: clear scene before
  const { renderer, camera, scene, raycaster, pointer } = init()

  const sphere = createSphere({})
  scene.add(sphere)
  sphere.callback = () => { sphereOnClick({ sphere, scene }) }

  updateSphereCount(scene)

  renderer.setAnimationLoop(() => animate({ renderer, camera, scene }))

  const orbitControls = new OrbitControls(camera, renderer.domElement)
  orbitControls.update()

  window.addEventListener('click', e => onClick(e, renderer, pointer, raycaster, scene, camera))
  // TODO: fix and add
  // window.addEventListener('resize', () => onWindowResize({ renderer, camera }))
}


import { OrbitControls } from './OrbitControls'
import { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, Raycaster, Vector2
 } from 'three'
import { onClick } from './utils/listeners'
import { createSphere, isSphere, sphereCb } from './utils/geometry'

const { innerWidth, innerHeight } = window

const init = () => {
  const renderer = new WebGLRenderer({ 
    antialias: true, 
    canvas: document.getElementById('canvas') 
  })
  renderer.setSize(innerWidth, innerHeight)
  
  const raycaster = new Raycaster()
  const scene = new Scene()
  const pointer = new Vector2()
  const camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    1000
  )

  camera.position.set(-10, 30, 30)

  const sphere = createSphere({})

  const ambientLight = new AmbientLight(0xFFFFFF)

  const directionalLight = new DirectionalLight(0xFFBFFF, 1.9)
  directionalLight.position.set(-30, 20, 10)

  scene.add(ambientLight)
  scene.add(directionalLight)
  scene.add(sphere)

  sphere.callback = () => { sphereCb({ sphere, scene }) }

  return {
    renderer,
    camera,
    scene,
    raycaster,
    pointer
  }
}


const animate = ({renderer, camera, scene}) => {
  const spheres = scene.children.filter(item => isSphere(item))

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

const onWindowResize = ({ renderer, camera }) => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)

}

export const createScene = () => {
  const { renderer, camera, scene, raycaster, pointer } = init()

  renderer.setAnimationLoop(() => animate({renderer, camera, scene}))

  const orbitControls = new OrbitControls(camera, renderer.domElement)
  orbitControls.update()

  document.body.appendChild(renderer.domElement)
  
  window.addEventListener( 'click', e => onClick(e, renderer, pointer, raycaster, scene, camera))
  window.addEventListener('resize', () => onWindowResize({ renderer, camera }))
}


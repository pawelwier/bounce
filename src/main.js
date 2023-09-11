import { WebGLRenderer, Scene, PerspectiveCamera, AxesHelper, AmbientLight, MeshStandardMaterial,
  Mesh, PlaneGeometry, GridHelper, DoubleSide, SphereGeometry, DirectionalLight, Raycaster, Vector2
 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onClick } from './utils/listeners'
import { createSphere, isSphere, sphereCb } from './utils/geometry'

const { innerWidth, innerHeight } = window

const renderer = new WebGLRenderer()
const raycaster = new Raycaster()
const scene = new Scene()
const pointer = new Vector2()
const camera = new PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
)
const orbitControls = new OrbitControls(camera, renderer.domElement)
const axesHelper = new AxesHelper(20)
const gridHelper = new GridHelper(30, 30)

renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

camera.position.set(-10, 30, 30)
orbitControls.update()

const sphere = createSphere({})

const planeGeometry = new PlaneGeometry(30, 30)
const planeMaterial = new MeshStandardMaterial({ 
  color: 0xFFFFFF,
  side: DoubleSide
})
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true


const ambientLight = new AmbientLight(0xFFFFFF)

const directionalLight = new DirectionalLight(0xFFBFFF, 1.9)
directionalLight.position.set(-30, 20, 10)
directionalLight.castShadow = true
directionalLight.shadow.camera.bottom = -5

scene.add(ambientLight)
scene.add(directionalLight)
scene.add(axesHelper)
scene.add(sphere)
scene.add(plane)
scene.add(gridHelper)

sphere.callback = () => sphereCb({ sphere, scene })

window.addEventListener( 'click', e => onClick(e, renderer, pointer, raycaster, scene, camera))

const animate = time => {
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

renderer.setAnimationLoop(animate)

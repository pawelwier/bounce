import { WebGLRenderer, Scene, PerspectiveCamera, AxesHelper,
  BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, GridHelper, DoubleSide,
 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { innerWidth, innerHeight } = window

const renderer = new WebGLRenderer()

renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new Scene()

const camera = new PerspectiveCamera(
  40,
  innerWidth / innerHeight,
  0.1,
  1000
)

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.update()

const axesHelper = new AxesHelper(4)

scene.add(axesHelper)

camera.position.set(20, 0, 50)

const boxGeometry = new BoxGeometry(8, 8, 8)
const boxMaterial = new MeshBasicMaterial({ color: 0x20FFF1 })
const box = new Mesh(boxGeometry, boxMaterial)

const planeGeometry = new PlaneGeometry(20, 20)
const planeMaterial = new MeshBasicMaterial({ 
  color: 0xFFFFFF,
  side: DoubleSide
})
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI

const gridHelper = new GridHelper(20, 20)

scene.add(box)
scene.add(plane)
scene.add(gridHelper)

const animateBox = time => {
  box.rotation.x = time / 1000 * 0.5
  box.rotation.y = time / 1000 * 2
  box.rotation.z = time / 1000
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animateBox)

import { WebGLRenderer, Scene, PerspectiveCamera, AxesHelper,
  BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, GridHelper, DoubleSide, SphereGeometry,
 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

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

const axesHelper = new AxesHelper(20)

scene.add(axesHelper)

camera.position.set(5, 5, 50)

const boxGeometry = new BoxGeometry(7, 6, 4)
const boxMaterial = new MeshBasicMaterial({ color: 0x20FFF1 })
const box = new Mesh(boxGeometry, boxMaterial)

const sphereGeometry = new SphereGeometry(3, 30, 30)
const sphereMaterial = new MeshBasicMaterial({ 
  color: 0x03123D,
  wireframe: true
})
const sphere = new Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(10, 6, 0)

const planeGeometry = new PlaneGeometry(30, 30)
const planeMaterial = new MeshBasicMaterial({ 
  color: 0xFFFFFF,
  side: DoubleSide
})
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI

const gui = new dat.GUI()

const options = {
  sphereColor: '#ff4321',
  boxColor: '#004333',
  sphereWireFrame: true
}

gui
  .addColor(options, 'sphereColor')
  .onChange(e => { sphere.material.color.set(e) })

gui
  .addColor(options, 'boxColor')
  .onChange(e => { box.material.color.set(e) })

gui
  .add(options, 'sphereWireFrame')
  .onChange(e => { sphere.material.wireframe = e })

const gridHelper = new GridHelper(30, 30)

scene.add(box)
scene.add(sphere)
scene.add(plane)
scene.add(gridHelper)

const animateBox = time => {
  box.rotation.x = time / 1000 * 0.5
  box.rotation.y = time / 1000 * 2
  box.rotation.z = time / 1000
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animateBox)

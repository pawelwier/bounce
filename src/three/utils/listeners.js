import { isSphere } from "./geometry";

export const onClick = (e, renderer, pointer, raycaster, scene, camera) => {
  e.preventDefault();
  const { clientX, clientY } = e
  const { clientWidth, clientHeight } = renderer.domElement

  const { x = 0, y = 0 } = document.getElementById('canvas-main')?.getBoundingClientRect()
  pointer.x = ((clientX - x) / clientWidth) * 2 - 1
  pointer.y = - ((clientY - y) / clientHeight) * 2 + 1

  raycaster.setFromCamera(pointer, camera)

  const intersects = raycaster
    .intersectObjects(scene.children)
    .filter(item => isSphere(item?.object))

  if (intersects.length) {
    const cb = intersects[0]?.object?.callback
    if (cb) cb()
  }
} 

export const onWindowResize = ({ renderer, camera }) => {
  const { innerWidth, innerHeight } = window

  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
}
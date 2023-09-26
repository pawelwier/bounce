import { isSphere } from "./geometry";

export const onClick = (e, renderer, pointer, raycaster, scene, camera) => {
  e.preventDefault();
  const { clientX, clientY } = e
  const { clientWidth, clientHeight } = renderer.domElement

  pointer.x = (clientX / clientWidth) * 2 - 1
  pointer.y = - (clientY / clientHeight) * 2 + 1

  raycaster.setFromCamera(pointer, camera)

  const intersects = raycaster
    .intersectObjects(scene.children)
    .filter(item => isSphere(item?.object))

  if (intersects.length) {
    const cb = intersects[0]?.object?.callback
    if (cb) cb()
  }
} 
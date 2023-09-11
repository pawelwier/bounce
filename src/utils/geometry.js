import { SphereGeometry, MeshStandardMaterial, Mesh } from "three"
import { initConfig } from '../config/initConfig'

const { sphereRadius, sphereColor, elementsOnClick } = initConfig

export const createSphere = ({ radius = sphereRadius, color = sphereColor }) => {
  const sphereGeometry = new SphereGeometry(radius, 50, 50)
  const sphereMaterial = new MeshStandardMaterial({ 
    color,
    wireframe: false
  })
  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(-10, 10, 0)
  sphere.step = 0
  sphere.castShadow = true

  return sphere
}

export const isSphere = item => item?.geometry?.type === 'SphereGeometry'

export const sphereCb = ({ sphere, scene }) => {
  scene.remove(sphere)
  const { position, geometry } = sphere
  const { parameters: { radius } } = geometry
  const { x, y, z } = position

  const iterations = [...Array(elementsOnClick)]
  iterations.forEach((_, i) => {
    const newSphere = createSphere({ radius: radius / elementsOnClick })
    newSphere.position.set(x * 2 * i, y * 2 * i, z * 2 * i)
    newSphere.callback = () => sphereCb({ sphere: newSphere, scene })

    scene.add(newSphere)
  })
}
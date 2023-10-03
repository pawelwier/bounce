import { SphereGeometry, MeshStandardMaterial, Mesh, Color } from "three"
import { initConfig } from '../config/initConfig'
import { updateSphereCount } from "./htmlUtils"

const { sphereRadius, sphereColor, elementsOnClick } = initConfig

const getRandomGgbValue = () => Math.floor(Math.random() * 255)

const getRandomRgb = () => (
  `rgb(${getRandomGgbValue()}, ${getRandomGgbValue()}, ${getRandomGgbValue()})`
)

export const isSphere = item => item?.geometry?.type === 'SphereGeometry'

export const getSpheres = scene => scene.children.filter(item => isSphere(item)) || []

export const getRandomSphere = scene => {
  const spheres = getSpheres(scene)
  return spheres[Math.floor(Math.random() * spheres.length)]
}

export const getNewScale = sphere => (
  (1 / elementsOnClick) * 1.2 * Math.sqrt(elementsOnClick) * sphere.scale.x  // x, y, z, are the same
)

export const createSphere = ({ radius = sphereRadius, color = sphereColor }) => {
  const sphereGeometry = new SphereGeometry(radius, 50, 50)
  const sphereMaterial = new MeshStandardMaterial({ 
    color,
    wireframe: false
  })
  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(-10, 10, 0)
  sphere.step = 0

  return sphere
}

export const addFirstSphere = scene => {
  const sphere = createSphere({})
  sphere.callback = () => { sphereOnClick({ sphere, scene }) }
  scene.add(sphere)
  updateSphereCount(scene)
}

export const addChildSphere = ({ sphere, scene }) => {
  const color = new Color(getRandomRgb())
  const scale = getNewScale(sphere)
  const { geometry: { parameters: { radius } } } = sphere
  const newSphere = createSphere({ 
    radius: scale * radius, 
    color  
  })
  newSphere.step = sphere.step + (2 * elementsOnClick * scale)
  newSphere.callback = () => { sphereOnClick({ sphere: newSphere, scene }) }
  
  scene.add(newSphere)
  updateSphereCount(scene)

  return scene
}

export const removeMeshObject = ({ scene, uuid }) => {
  const object = scene.getObjectByProperty('uuid', uuid)
  object.geometry.dispose()
  object.material.dispose()
  scene.remove(object)
  updateSphereCount(scene)

  return scene
}

export const clearScene = scene => {
  const uuids = getSpheres(scene).map(({ uuid }) => uuid)
  uuids.forEach(uuid => {
    removeMeshObject({ scene, uuid })
  })
}

export const sphereOnClick = ({ sphere, scene }) => {
  const iterations = [...Array(elementsOnClick)]
  const newScale = getNewScale(sphere)
  iterations.forEach((_, i) => {

    if (!i) {
      /* update first sphere */
      const object = scene.getObjectByProperty('uuid', sphere.uuid)
      object.scale.set(newScale, newScale, newScale)
      return
    }

    /* add new sphere */
    addChildSphere({ sphere, scene })
  })
  
  return scene
}
import { SphereGeometry, MeshStandardMaterial, Mesh, Color } from "three"
import { initConfig } from '../config/initConfig'

const { sphereRadius, sphereColor, elementsOnClick } = initConfig

const getRandomRgb = () => (
  `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
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

// TODO: use later
export const removeMeshObject = ({ scene, uuid }) => {
  const object = scene.getObjectByProperty('uuid', uuid)

  object.geometry.dispose()
  object.material.dispose()
  scene.remove(object)
}

export const isSphere = item => item?.geometry?.type === 'SphereGeometry'

export const sphereCb = ({ sphere, scene }) => {
  const { geometry, uuid, scale } = sphere
  const { parameters: { radius } } = geometry
  const iterations = [...Array(elementsOnClick)]
  iterations.forEach((_, i) => {
    const newScale = (1 / elementsOnClick) * Math.sqrt(elementsOnClick) * scale.x  // x, y, z, are the same
    const color = new Color(getRandomRgb())

    if (!i) {
      /* update first sphere */
      const object = scene.getObjectByProperty('uuid', uuid)
      object.scale.set(newScale, newScale, newScale),
      object.color = color
      return
    }

    /* add new spheres */
    const newSphere = createSphere({ 
      radius: newScale * radius, 
      color  
    })
    newSphere.step = sphere.step + (2 * elementsOnClick * newScale)
    newSphere.callback = () => { sphereCb({ sphere: newSphere, scene }) }
    
    scene.add(newSphere)
  })
}
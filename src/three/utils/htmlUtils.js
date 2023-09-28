import { initConfig } from "../config/initConfig"
import { isSphere } from "./geometry"

export const getCanvasHeight = () => {
  const { innerWidth, innerHeight } = window
  const ratio = innerHeight / innerWidth
  return initConfig.canvasWidth * ratio
} 

export const updateSphereCount = scene => {
  const spheres = scene.children.filter(item => isSphere(item))
  
  document.getElementById('ball-count').innerHTML = spheres.length
}
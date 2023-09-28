export const initConfig = {
  /* canvas */
  canvasWidth: 600,
  /* sphere */
  sphereRadius: 4,
  sphereColor: 0x0000FF,
  elementsOnClick: 2 // TODO: prepare code for > 2
}

export const getCanvasHeight = () => {
  const { innerWidth, innerHeight } = window
  const ratio = innerHeight / innerWidth
  return initConfig.canvasWidth * ratio
} 
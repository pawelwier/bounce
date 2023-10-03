<script>
import { onMount } from 'svelte'
import { sceneStore } from '../stores/sceneStore'
import { createScene } from '../three/main'
import { getCanvasHeight } from '../three/utils/htmlUtils'
import { addFirstSphere, clearScene } from '../three/utils/geometry'

const setScene = () => { sceneStore.set(createScene()) }

const resetScene = () => {
  clearScene($sceneStore)
  addFirstSphere($sceneStore)
}

onMount(() => {
  setScene()
  document.addEventListener("scene-updated", e => { sceneStore.set(e.detail) })  
})
</script>

<div 
  class="canvas-container"
  style="grid-template-rows: {getCanvasHeight()}px 6rem;"
>
  <canvas	id='canvas-main'></canvas>
  <button 
    class="btn-main"  
    on:click={resetScene}
  >Restart</button>
</div>

<script>
import { onMount } from 'svelte'
import { createScene } from '../three/main'
import { getCanvasHeight } from '../three/config/initConfig'

onMount(createScene)
</script>

<div 
  class="canvas-container"
  style="grid-template-rows: {getCanvasHeight()}px 6rem;"
>
  <canvas	id='canvas-main'></canvas>
  <button on:click={createScene}>Restart</button>
</div>

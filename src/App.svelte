<script>
import { onMount } from 'svelte'
import { createScene } from './three/main'

onMount(createScene)
</script>

<button on:click={createScene}>Restart</button>

<canvas	id='canvas'></canvas>

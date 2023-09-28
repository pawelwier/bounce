<script>
let count = 0

const onAddBall = () => {
  // TODO: add ball from random one
}

const onRemoveBall = () => {
  // TODO: remove random ball
}
</script>

<div class="page-main">
  <button
    on:click={onRemoveBall}
  >-</button>
  <div>
    <span>
      Ball count: 
    </span>
    <span id="ball-count">
      {count}
    </span>
  </div>
  <button
    on:click={onAddBall}
  >+</button>
</div>
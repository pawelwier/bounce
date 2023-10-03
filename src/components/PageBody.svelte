<script>
import BallMenuBtn from "./BallMenuBtn.svelte";
import { MenuActionType } from "./data";

let count = 0
</script>

<div class="page-main">
  <BallMenuBtn action={MenuActionType.SUB} />
    <span>
      Ball count: 
    </span>
    <span id="ball-count">
      {count}
    </span>
  <BallMenuBtn />
</div>
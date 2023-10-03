<script>
import BallMenuBtn from "./BallMenuBtn.svelte";
import { MenuActionType } from "./data";

let count = 0
</script>

<div class="page-main">
  <BallMenuBtn action={MenuActionType.SUB} />
    <div class="ball-count-text">
      <span>
        Ball count
      </span>
      <span id="ball-count">
        {count}
      </span>  
    </div>    
  <BallMenuBtn />
</div>
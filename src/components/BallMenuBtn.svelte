<script>
import { sceneStore } from '../stores/sceneStore'
import { initConfig } from '../three/config/initConfig'
import { 
  getRandomSphere, getSpheres, removeMeshObject, sphereOnClick
} from '../three/utils/geometry'
import { MenuActionType } from './data'

export let action = MenuActionType.ADD

$: isAddAction = action === MenuActionType.ADD
$: symbol = isAddAction ? '+' : '-'
$: isMinCount = $sceneStore ? getSpheres($sceneStore)?.length <= initConfig.minSphereCount : true
$: disabled = isMinCount && !isAddAction

const removeBall = ({ sphere, scene }) => {
  if (isMinCount) return
  return removeMeshObject({ scene, uuid: sphere?.uuid })
}

// TODO: fix ball onclick store update
const onClick = () => {
  const sphere = getRandomSphere($sceneStore)
  const scene = isAddAction ? sphereOnClick({ sphere, scene: $sceneStore })
    : removeBall({ sphere, scene: $sceneStore })
  sceneStore.set(scene)
}
</script>

<button
  on:click={onClick}
  {disabled}
>
 {symbol}
</button>
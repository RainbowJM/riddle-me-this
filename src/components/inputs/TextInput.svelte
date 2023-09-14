<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let label = "";
  export let name = "";
  export let placeholder = "";
  export let value = "";
  export let ref = null;

  const enter = () => dispatch('enter');
</script>

<div class="flex-1 flex-col text-center">
  <p class="text-sm">{label}</p>
  <input 
    class="input input-bordered input-secondary text-onSurface w-full max-w-xs" 
    type="text" 
    name={name || label}
    placeholder={placeholder || label}
    bind:value
    on:keyup={(event) => event.key === 'Enter' && enter()}
    bind:this={ref}
  />
</div>
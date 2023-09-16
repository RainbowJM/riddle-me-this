<script>
  import IconHome from "~icons/mdi/home";
	import { createEventDispatcher } from "svelte";

  export let disabled = false;

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');

</script>

<button class="btn" on:click={click} {disabled}>
  <IconHome />
  <span>Home</span>
</button>
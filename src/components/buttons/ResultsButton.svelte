<script>
  import IconChartBar from "~icons/mdi/chart-bar";
	import { createEventDispatcher } from "svelte";

  export let disabled = false;

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');

</script>

<button class="btn" on:click={click} {disabled}>
  <IconChartBar />
  <span>See Results</span>
</button>
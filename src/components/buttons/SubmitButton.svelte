<script>
  import IconSend from "~icons/mdi/send";
	import { createEventDispatcher } from "svelte";

  export let disabled = false;

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');

</script>

<button class="btn btn-primary" on:click={click} {disabled}>
  <IconSend />
  <span>Submit</span>
</button>
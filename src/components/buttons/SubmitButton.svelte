<script>
  // @ts-ignore
  import IconSend from "~icons/mdi/send";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');
</script>

<button class="btn btn-primary" on:click={click}>
  <IconSend />
  <span>Submit</span>
</button>
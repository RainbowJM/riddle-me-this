<script>
  import IconLogin from "~icons/mdi/login";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');
</script>

<button class="btn" on:click={click}>
  <IconLogin />
  <span>Trouble Logging in?</span>
</button>
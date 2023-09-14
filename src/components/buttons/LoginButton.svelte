<script>
  // @ts-ignore
  import IconLogin from "~icons/mdi/login";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');
</script>

<button class="btn btn-secondary" on:click={click}>
  <IconLogin />
  <span>Login With Google</span>
</button>
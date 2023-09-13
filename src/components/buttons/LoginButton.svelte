<script>
	import { createEventDispatcher } from "svelte";
  import IconLogin from "~icons/mdi/logout";

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');
</script>

<button class="btn btn-secondary" on:click={click}>
  <IconLogin />
  <span>Login With Google</span>
</button>
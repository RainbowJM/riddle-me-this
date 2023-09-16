<script>
  import IconLogout from "~icons/mdi/logout";
	import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const click = () => dispatch('click');
</script>

<button class="btn btn-secondary" on:click={click}>
  <IconLogout />
  <span>Logout</span>
</button>
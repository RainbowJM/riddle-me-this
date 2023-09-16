<script>
	import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/auth";
	import { onMount } from "svelte";
	import { userStore } from "sveltefire";
  
  onMount(() => userStore(auth).subscribe((user) => !user?.uid && goto("/")));
</script>

<slot />
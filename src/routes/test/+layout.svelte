<script>
	import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/auth";
	import { onMount } from "svelte";
	import { userStore } from "sveltefire";
	import TopBar from "../../components/containers/TopBar.svelte";
	import FlatAlert from "../../components/containers/FlatAlert.svelte";

  // onMount(() => userStore(auth).subscribe((user) => !user?.uid && goto("/")));
</script>

<TopBar />
<FlatAlert />

<slot />
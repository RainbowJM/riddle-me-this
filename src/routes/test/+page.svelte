<script>
	import fetchUserById from '$lib/firebase/fetchUserById';
	import { onMount } from 'svelte';

	onMount(async () => {
		let usr = await fetchUserById('TEMPUSR');
		console.log(usr);
	});
</script>

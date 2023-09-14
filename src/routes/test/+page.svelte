<script>
	import fetchUserById from '$lib/firebase/fetchUserById';
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log('testing....');
		let usr = await fetchUserById('TEMPUSR');
	});
</script>

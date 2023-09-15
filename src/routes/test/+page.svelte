<script>
	import fetchUserById from '$lib/firebase/fetchUserById';
	import { onMount } from 'svelte';
	import '$lib/firebase/process';
	import { getTodayWinners, getPointsOnWinAndSave } from '$lib/firebase/process';

	onMount(async () => {
		console.log('testing....');
		let usr = await getPointsOnWinAndSave('TEMPUSER');
	});
</script>

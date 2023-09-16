<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { collection, doc, onSnapshot } from "firebase/firestore";
	import { firestore } from '$lib/firebase/app';
	import { watchFirestoreUsers, type UserFormat, userListState } from '../../store/users';
	import { setTodayStandings } from '../../store/standings';

	let unSubDoc = () => {};
	let unSubCol = () => {};

	
	onMount(async () => {
		console.log('testing....');
		// unSubDoc = onSnapshot(doc(firestore, "Users", "TEMPUSR"), (doc) => console.log("Current data: ", doc.data()));

		setTodayStandings("da80jkzjt9SUXFpO8bb0WTcOdTH2").then(standings => console.log(standings))
	});

	onDestroy(() => unSubDoc());
	onDestroy(() => unSubCol());
</script>

{#each $userListState as user}
	<p class="text-lg font-bold m-10">{user.uid}</p>
	<p>{user.displayName}</p>
{/each}

<br>

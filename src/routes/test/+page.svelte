<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import { collection, doc, onSnapshot } from "firebase/firestore";
	import { firestore } from '$lib/firebase/app';
	import { watchFirestoreUsers, type UserFormat, userListState } from '../../store/users';
	import { setTodayStandings, watchFirestoreStandings } from '../../store/standings';

	let unSubDoc = () => {};
	let unSubCol = () => {};

	
	onMount(async () => {
		console.log('testing....');
		// unSubDoc = onSnapshot(doc(firestore, "Users", "TEMPUSR"), (doc) => console.log("Current data: ", doc.data()));

		// setTodayStandings("da80jkzjt9SUXFpO8bb0WTcOdTH2").then(standings => console.log(standings))

		// watchFirestoreStandings();
	});

	onDestroy(() => unSubDoc());
	onDestroy(() => unSubCol());
</script>

<br>

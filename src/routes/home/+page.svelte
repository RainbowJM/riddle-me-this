<script>
	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	import ShowConfetti from '../../components/animation/ShowConfetti.svelte';
	import Card from '../../components/containers/Card.svelte';
	import StandingsTable from '../../components/containers/StandingsTable.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { watchFirestoreUsers } from '../../store/users';
	import {
		standingListState,
		todayWinnerListState,
		watchTodayStandings
	} from '../../store/standings';

	export let data;
	export let form;
	let state = 0;

	let unWatchUsers = () => {};
	let unWatchStandings = () => {};

	onMount(() => (unWatchUsers = watchFirestoreUsers()));
	onMount(() => (unWatchStandings = watchTodayStandings()));
	onMount(() =>
		todayWinnerListState.subscribe((list) => {
			state = list.length;
		})
	);

	onDestroy(() => unWatchUsers());
	onDestroy(() => unWatchStandings());
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Card>
	<RiddleForm>
		<h1 class="text-2xl text-center">{data.question}</h1>
		<TextInput placeholder="Write your answer" name="answer" disabled={state > 4} />

		<SubmitButton disabled={state > 4} />

		<div>
			{#if form?.isCorrect == true}
				<ShowConfetti />
				<p class="text-success text-center">
					<span>Your answer: </span><span class="font-bold text-accent"
						>"{form?.userAnswer}"
					</span><span>is correct!</span>
				</p>
			{/if}
			{#if form?.isCorrect == false}
				<p class="text-secondary text-center">
					<span>Your answer: </span><span class="font-bold text-error"
						>"{form?.userAnswer}"
					</span><span>is wrong</span>
				</p>
				<p class="text-secondary text-center">
					<span>The correct answer was: </span><span class="font-bold text-primary"
						>"{form?.correctAnswer}"</span
					>
				</p>
				<p class="text-lg text-center my-4">Don't Give up! Try Again!! 💪</p>
			{/if}
		</div>
		{#if state > 4}
			<div class="alert alert-info">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>All standings set for today, comeback tomorrow for a chance to earn more points.</span
				>
			</div>
		{/if}
	</RiddleForm>
</Card>f

<Card>
	<StandingsTable />
</Card>

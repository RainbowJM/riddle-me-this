<script>
	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	import ShowConfetti from '../../components/animation/ShowConfetti.svelte';
	import Card from '../../components/containers/Card.svelte';
	import StandingsTable from '../../components/containers/StandingsTable.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { watchFirestoreUsers } from '../../store/users';
	import { watchTodayStandings } from '../../store/standings';

	export let data;
	export let form;

	let unWatchUsers = () => {};
	let unWatchStandings = () => {};

	onMount(() => (unWatchUsers = watchFirestoreUsers()));
	onMount(() => (unWatchStandings = watchTodayStandings()));

	onDestroy(() => unWatchUsers());
	onDestroy(() => unWatchStandings());
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Card>
	<RiddleForm>
		<h1 class="text-2xl text-center">{data.question}</h1>
		<TextInput placeholder="Write your answer" name="answer" />

		<SubmitButton disabled={form?.isCorrect} />

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
	</RiddleForm>
</Card>

<Card>
	<StandingsTable />
</Card>

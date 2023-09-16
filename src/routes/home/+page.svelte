<script>
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase/auth';

	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	import ShowConfetti from '../../components/animation/ShowConfetti.svelte';
	import TopBar from '../../components/containers/TopBar.svelte';

	export let data;
	export let form;

	const user = userStore(auth);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TopBar />

<RiddleForm>
	<h1 class="text-2xl text-center">{data.question}</h1>
	<TextInput placeholder="Write your answer" name="answer" />
	
	<SubmitButton />
</RiddleForm>

{#if form?.isCorrect == true }
	<ShowConfetti />
	<p class="text-success text-center">
		<span>Your answer: </span><span class="font-bold text-accent">"{form?.userAnswer}" </span><span>is correct!</span>
	</p>
{/if}
{#if form?.isCorrect == false }
	<p class="text-secondary text-center">
		<span>Your answer: </span><span class="font-bold text-error">"{form?.userAnswer}" </span><span>is wrong</span>
	</p>
	<p class="text-secondary text-center">
		<span>The correct answer was: </span><span class="font-bold text-primary">"{form?.correctAnswer}"</span>
	</p>
{/if}

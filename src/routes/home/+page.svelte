<script>
	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	import ShowConfetti from '../../components/animation/ShowConfetti.svelte';

	export let data;
	export let form;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<RiddleForm>
	<h1 class="text-2xl text-center">{data.question}</h1>
	<TextInput placeholder="Write your answer" name="answer" />
	
	<SubmitButton />

	<div>
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
		<p class="text-lg text-center my-4">Don't Give up! Try Again!! 💪</p>
		{/if}
	</div>
</RiddleForm>

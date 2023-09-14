<script>
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase/auth';

	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	import ShowConfetti from '../../components/animation/ShowConfetti.svelte';

	export let data;
	export let form;

	const user = userStore(auth);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<RiddleForm>
	<h1 class="text-2xl text-center">{data.question}</h1>
	<TextInput placeholder="Write your answer" name={'answer'} />
	
	<SubmitButton />
</RiddleForm>

{#if form?.isCorrect == true }
	<ShowConfetti />
	<p class="text-lime-500 text-center">answer is correct</p>
{/if}
{#if form?.isCorrect == false }
	<p class="text-orange-500 text-center">answer is incorrect</p>
{/if}

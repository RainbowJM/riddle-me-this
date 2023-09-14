<script>
	import Textinput from '../../components/text/input/Textinput.svelte';
	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';

	export let data;
	export let form;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<RiddleForm>
	<p class="text-center">{data.question}</p>
	<Textinput type={'text'} placeholder={'Guess the word'} name={'answer'} />
	<SubmitButton title={'Submit'} />
</RiddleForm>

{#if form?.success}
	<p class="text-lime-500 text-center">answer is correct</p>
{/if}
{#if form?.incorrect}
	<p class="text-orange-500 text-center">answer is incorrect</p>
{/if}

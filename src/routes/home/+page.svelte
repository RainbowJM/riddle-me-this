<script>
	import Textinput from '../../components/text/input/Textinput.svelte';
	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<RiddleForm>
	<p class="text-center">Whats is the riddle?</p>
	<Textinput type={'text'} placeholder={'Guess the word'} />
	<SubmitButton title={'Submit'} />
</RiddleForm>

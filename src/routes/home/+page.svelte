<script>
	import { userStore } from 'sveltefire';
	import { auth } from '$lib/firebase/auth';

	import SubmitButton from '../../components/buttons/SubmitButton.svelte';
	import RiddleForm from '../../components/forms/RiddleForm.svelte';
	import TextInput from '../../components/inputs/TextInput.svelte';
	
	const user = userStore(auth);
	
	let riddleQuestion= "What is the name of the of the testing riddle?";

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<RiddleForm>
	<h1 class="text-2xl text-center">{riddleQuestion}</h1>
	<TextInput placeholder="Write your answer" />
	<SubmitButton />
</RiddleForm>

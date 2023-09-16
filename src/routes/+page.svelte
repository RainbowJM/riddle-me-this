<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { auth } from "$lib/firebase/auth";
	import { onAuthStateChanged } from "firebase/auth";

	import LoginBackground from "../components/containers/LoginBackground.svelte";
	import LoginForm from "../components/forms/LoginForm.svelte";

	onMount(() => onAuthStateChanged(auth, (user) => user && goto("/home")));
</script>

<LoginBackground>
  <LoginForm />
</LoginBackground>
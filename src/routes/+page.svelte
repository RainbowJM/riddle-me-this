<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { auth, storeAuthUserAsync } from "$lib/firebase/auth";
	import { onAuthStateChanged } from "firebase/auth";

	import LoginBackground from "../components/containers/LoginBackground.svelte";
	import LoginForm from "../components/forms/LoginForm.svelte";
	import { alertTextState, alertTypeState } from "../store/alert";
	import FlatAlert from "../components/containers/FlatAlert.svelte";

	onMount(() => onAuthStateChanged(auth, (user) => {
		if (user) {
			storeAuthUserAsync()
				.then(() => {
					alertTypeState.set("");
					alertTextState.set("Your account information has been stored in the database");
					document.cookie = `uid=${user.uid}`;
					goto("/home");
				})
				.catch((err) => {
					alertTypeState.set("error");
					alertTextState.set("There was an error storing your account information: " + err.message);
				})
		}
	}));
</script>

<LoginBackground>
  <LoginForm />
	<FlatAlert />
</LoginBackground>
<script>
  // @ts-ignore
  import MediaQuery from "svelte-media-query";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { auth, googleSignOut } from "$lib/firebase/auth";
	import { userStore } from "sveltefire";

	import LogoutButton from "../buttons/LogoutButton.svelte";
	import Logo from "../images/Logo.svelte";
	import ResultsButton from "../buttons/ResultsButton.svelte";
	import { page } from "$app/stores";
	import HomeButton from "../buttons/HomeButton.svelte";

  let displayName = "";
  let localeTime = "";
  let greeting = "Hello";

  const user = userStore(auth);
  user.subscribe(state => displayName = state?.displayName || "");

  onMount(() => {
    const today = new Date();
    const currentHour = today.getHours();
    localeTime = today.toString();

    switch (true) {
      case currentHour >= 0 && currentHour < 12:
        greeting = `Good Morning, ${displayName}! 👋`;
        break;
      case currentHour >= 12 && currentHour < 18:
        greeting = `Good Afternoon, ${displayName}! 👋`;
        break;    
      default:
        greeting = `Good Evening ${displayName}! 👋`;
        break;
    }
  });

  const gotoHomePage = () => goto('/home');
  const gotoResultPage = () => goto('/results');
  const logout = () => googleSignOut().then(() => goto('/'));
</script>

<MediaQuery query="(max-width: 1000px)" let:matches>
  {#if matches}
     <div class="navbar flex-1 flex-col p-6 gap-8">
        <div class="flex-1 flex w-full justify-between">
          <!-- Logo -->
          <div class="w-28 mx-6">
            <Logo />
          </div>
          <!-- Actions -->
          <div class="flex-none gap-2">
            {#if $page.route.id !== "/home"}
            <HomeButton on:click={gotoHomePage} />
            {/if}
            {#if $page.route.id === "/home"}
            <ResultsButton on:click={gotoResultPage} />
            {/if}
            <LogoutButton on:click={logout} />
          </div>
        </div>

        <!-- Greeting -->
        <div class="flex-1 flex-col items-start">
          <h1 class="text-lg text-primary font-bold">{greeting}</h1>
          <span class="text-sm">{localeTime}</span>
        </div>
     </div>
  {:else}
    <div class="navbar flex-1 p-10 gap-8">
      <!-- Logo -->
      <div class="w-28 mx-6">
        <Logo />
      </div>

      <!-- Greeting -->
      <div class="flex-1 flex-col items-start">
        <h1 class="text-lg text-primary font-bold">{greeting}</h1>
        <span class="text-sm">{localeTime}</span>
      </div>

      <!-- Actions -->
      <div class="flex-none gap-2">
        <ResultsButton on:click={gotoResultPage} />
        <LogoutButton on:click={logout} />
      </div>
    </div>
  {/if}
</MediaQuery>


<script lang="ts">
	import { goto } from "$app/navigation";
	import { auth, googleSignInRedirect } from "$lib/firebase/auth";
  import { userStore } from 'sveltefire';

  import Logo from "../images/Logo.svelte";
  import LoginButton from "../buttons/LoginButton.svelte"

  const user = userStore(auth);

  const login = () => googleSignInRedirect();

  const redirect = () => goto("/home");
</script>

<div class="flex flex-1 min-w-full bg-surface">
  <div class="flex-1 flex flex-col">
    <div class="flex mt-16 md:ml-20 justify-center">
      <Logo />
    </div>
    
    <div class="flex mt-20 md:ml-20 justify-center">
      <div class="card">
        <div class="card-body">
          {#if $user}
          <h2 class="card-title">Welcome back, {$user.displayName}</h2>
          {:else}
          <h2 class="card-title">Welcome Please Login</h2>
          {/if}
                
          <div class="card-actions mt-3 justify-center">
          {#if $user}
            <LoginButton on:click={redirect} />
          {:else}
            <LoginButton on:click={login} />
          {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="flex md:ml-20 justify-center">
      <!-- <FlatAlert /> -->
    </div>
  </div>
</div>
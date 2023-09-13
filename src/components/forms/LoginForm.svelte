<script lang="ts">
  import Logo from "../images/Logo.svelte";
  import LoginButton from "../buttons/LoginButton.svelte"
  
	// import FlatAlert from "../containers/FlatAlert.svelte";
	// import LoginButton from "../buttons/LoginButton.svelte";

  const login = () => {
    
  };
</script>

<div class="flex flex-1 h-full min-w-full bg-surface">
  <div class="flex-1 flex flex-col">
    <div class="flex mt-16 md:ml-20 justify-center">
      <Logo />
    </div>
    
    <div class="flex mt-20 md:ml-20 justify-center">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Welcome Please Login</h2>
                
          <div class="card-actions mt-3">
            <LoginButton on:click={login} />
          </div>
        </div>
      </div>
    </div>

    <div class="flex md:ml-20 justify-center">
      <!-- <FlatAlert /> -->
    </div>
  </div>
</div>
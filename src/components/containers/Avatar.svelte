<script>
  export let photoURL = "";
  export let displayName = "Not Available";

  let initials = "";
  const names = displayName.split(" ");

  switch (true) {
    case names.length == 1:
      initials = names[0].charAt(0);
      break;
    case names.length > 1:
      initials = names[0].charAt(0) + names[1].charAt(0);
      break;
  
    default:
      initials = "?";
      break;
  }
</script>

{#if photoURL}
  <div class="avatar">
    <div class="bg-secondary rounded-full rounded-full w-12">
      <img src={photoURL} alt="User Avatar" />
    </div>
  </div>

{:else}
  <div class="avatar placeholder">
    <div class="bg-secondary rounded-full w-12">
      <span class="text-xl">{initials}</span>
    </div>
  </div>

{/if}
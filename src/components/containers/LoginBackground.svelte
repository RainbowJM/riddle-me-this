<script>
  // @ts-ignore
  import MediaQuery from "svelte-media-query";
</script>

<MediaQuery query="(max-width: 1000px)" let:matches>
  {#if matches}
    <div class="flex-1 h-screen">
      <slot />
    </div>
  {:else}
    <div class="h-screen flex bg-contain bg-center bg-no-repeat md:bg-fixed md:bg-cover bg-secondary scoped-parallax">
      <div class="flex-1 h-full bg-gradient-to-r from-accent/40 via-primary/70 to-secondary/100">
      </div>
      <div class="flex-1 h-full bg-secondary">
        <div class="flex-1 h-full bg-white box">
          <slot />
        </div>
      </div>
    </div>
  {/if}
</MediaQuery>

<style>
  .scoped-parallax {
    background-image: url("/puzzleBackground.jpg");
  }
  .box {
    --mask:
      radial-gradient(164.01px at 230.00px 50%,#000 99%,#0000 101%) 0 calc(50% - 200px)/100% 400px,
      radial-gradient(164.01px at -130px 50%,#0000 99%,#000 101%) 100px 50%/100% 400px repeat-y;
    -webkit-mask: var(--mask);
            mask: var(--mask);
    }
</style>

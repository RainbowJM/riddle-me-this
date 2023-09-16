<script>
  import IconClose from "~icons/mdi/close";
  import IconCloseOctagon from "~icons/mdi/close-octagon";
  import IconInformation from "~icons/mdi/information";
  import IconAlert from "~icons/mdi/alert";
  import IconCheckDecagram from "~icons/mdi/check-decagram";
  import IconChatQuestion from "~icons/mdi/chat-question";

  import { alertTextState, alertTypeState } from "../../store/alert";

  let text = "";
  let type = "";

  alertTextState.subscribe((textState) => text = textState);
  alertTypeState.subscribe((typeState) => type = typeState);

  const dismissAlert = () => {
    alertTextState.set("");
    alertTypeState.set("");
  };
  
</script>

{#if type === "info" && text}
<div class="flex-1 flex m-6">
  <div class="alert alert-info flex-1 flex justify-between">
    <IconInformation />
    
    <span>{text}</span>
    
    <button class="btn btn-sm btn-square btn-ghost" on:click={dismissAlert}>
      <IconClose />
    </button>
  </div>
</div>

{:else if type === "success" && text}
<div class="flex-1 flex m-6">
  <div class="alert alert-success flex-1 flex justify-between">
    <IconCheckDecagram />
    
    <span>{text}</span>
    
    <button class="btn btn-sm btn-square btn-ghost" on:click={dismissAlert}>
      <IconClose />
    </button>
  </div>
</div>

{:else if type === "warning" && text}
<div class="flex-1 flex m-6">
  <div class="alert alert-warning flex-1 flex justify-between">
    <IconAlert />
    
    <span>{text}</span>
    
    <button class="btn btn-sm btn-square btn-ghost" on:click={dismissAlert}>
      <IconClose />
    </button>
  </div>
</div>

{:else if type === "error" && text}
<div class="flex-1 flex m-6">
  <div class="alert alert-error flex-1 flex justify-between">
    <IconCloseOctagon />
    
    <span>{text}</span>
    
    <button class="btn btn-sm btn-square btn-ghost" on:click={dismissAlert}>
      <IconClose />
    </button>
  </div>
</div>

{:else if text}
<div class="flex-1 flex m-6">
  <div class="alert flex-1 flex justify-between">
    <IconChatQuestion />
    
    <span>{text}</span>
    
    <button class="btn btn-sm btn-square btn-ghost" on:click={dismissAlert}>
      <IconClose />
    </button>
  </div>
</div>

{/if}

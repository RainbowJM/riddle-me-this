<script lang="ts">
	import { onMount } from "svelte";
  import IconChartBar from "~icons/mdi/chart-bar";
	import Avatar from "./Avatar.svelte";

	import { allWinnerState, type DayWinnerFormat } from "../../store/standings";

  export let dayDate: string = "";

  let dayWinner: DayWinnerFormat[] = [];
  
	onMount(() => allWinnerState.subscribe((state) => {
    if (state[dayDate]) dayWinner = state[dayDate];
	}));

  const calculatePointBarWidth = (points: number) => ((points / 25) * 100 + '%');
</script>

<div class="overflow-x-auto m-5 lg:flex">
  <div class="flex-1 flex gap-2 mt-1 mb-3">
    <IconChartBar />
    <h1 class="text-lg">
      <span>Standings for </span><span class="font-bold">{dayDate}</span>
    </h1>
  </div>

  <table class="table max-w-3xl">
    <!-- head -->
    <thead>
      <tr>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>

    <tbody>
      {#each dayWinner as user (user.uid)}
      <tr>
        <td>
          <div class="flex items-center space-x-3">
            <Avatar photoURL={user.photoURL} displayName={user.displayName} />
            <div>
              <div class="font-bold">{user.displayName}</div>
              <div class="text-sm opacity-50">{user.email}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="flex-1 flex flex-col">
            <div class="h-4 rounded-md animate-gradient" style="width: {calculatePointBarWidth(user.score)}" />
            <div>{user.score} points</div>
          </div>
        </td>
      </tr>
      {/each}
    
  </table>
</div>

<style>
	@keyframes gradientAnimation {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 100% 50%;
		}
	}

	.animate-gradient {
		background: linear-gradient(90deg, #ff69b4, #800080);
		background-size: 200% 100%;
		animation: gradientAnimation 1.5s infinite alternate;
	}
</style>
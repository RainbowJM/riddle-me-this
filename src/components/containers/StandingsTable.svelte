<script>
  import IconChartBar from "~icons/mdi/chart-bar";
	import Avatar from "./Avatar.svelte";
	import { todayWinnerListState } from "../../store/standings";
</script>

<div class="overflow-x-auto m-5 md:flex">
  <div class="flex-1 flex gap-2 mt-1 mb-3">
    <IconChartBar />
    <h1 class="text-lg">Standings</h1>
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
      {#each $todayWinnerListState as user}
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
        <th>
          <button class="btn btn-ghost btn-xs">{user.score}</button>
        </th>
      </tr>
      {/each}
    
  </table>
</div>
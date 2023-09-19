<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import DayWinnerTable from "../../components/containers/DayWinnerTable.svelte";
	import Card from "../../components/containers/Card.svelte";

	import { allWinnerState, watchFirestoreStandings, type DayWinnerFormat } from "../../store/standings";
	import TotalWinnerTable from "../../components/containers/TotalWinnerTable.svelte";

  let unSubscribeFromStandingsWatcher = () => {};

  console.log('allWinnerState page', $allWinnerState);

  onMount(() => unSubscribeFromStandingsWatcher = watchFirestoreStandings());
  onDestroy(() => unSubscribeFromStandingsWatcher());
</script>

<div class="flex-1 flex flex-col">
  <div class="divider mx-10 text-secondary">Totals</div>
  
  <Card>
    <TotalWinnerTable />
  </Card>

  <div class="divider mx-10 text-secondary">Daily Winners</div>
  
  <Card>
    <DayWinnerTable dayDate="2023-09-18" />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-19" />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-20" />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-21" />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-22" />
  </Card>
</div>

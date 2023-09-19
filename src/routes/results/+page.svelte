<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import DayWinnerTable from "../../components/containers/DayWinnerTable.svelte";
	import Card from "../../components/containers/Card.svelte";

	import { allWinnerState, watchFirestoreStandings, type DayWinnerFormat } from "../../store/standings";
	import TotalWinnerTable from "../../components/containers/TotalWinnerTable.svelte";

  let monday: DayWinnerFormat[] = [];
	let tuesday: DayWinnerFormat[] = [];
	let wednesday: DayWinnerFormat[] = [];
	let thursday: DayWinnerFormat[] = [];
	let friday: DayWinnerFormat[] = [];

  let unsub = () => {};
  onMount(() => unsub = watchFirestoreStandings());
  
	onMount(() => allWinnerState.subscribe((state) => {
    if (state["2023-09-18"]) monday = state["2023-09-18"];
		if (state["2023-09-19"]) tuesday = state["2023-09-19"];
		if (state["2023-09-20"]) wednesday = state["2023-09-20"];
		if (state["2023-09-21"]) thursday = state["2023-09-21"];
		if (state["2023-09-22"]) friday = state["2023-09-22"];
	}));
  
  onDestroy(() => unsub());
</script>

<div class="flex-1 flex flex-col">
  <div class="divider mx-10 text-secondary">Totals</div>
  
  <Card>
    <TotalWinnerTable />
  </Card>

  <div class="divider mx-10 text-secondary">Daily Winners</div>
  
  <Card>
    <DayWinnerTable dayDate="2023-09-18" dayWinner={monday} />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-19" dayWinner={tuesday} />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-20" dayWinner={wednesday} />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-21" dayWinner={thursday} />
  </Card>
  <Card>
    <DayWinnerTable dayDate="2023-09-22" dayWinner={friday} />
  </Card>
</div>

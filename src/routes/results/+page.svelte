<script>
	import { onDestroy, onMount } from "svelte";
    import ResultTable from "../../components/containers/ResultTable.svelte";
	import { watchFirestoreStandings } from "../../store/standings";

    let unsub = () => {};
    onMount(() => unsub = watchFirestoreStandings());
    onDestroy(() => unsub());
</script>

<ResultTable></ResultTable>

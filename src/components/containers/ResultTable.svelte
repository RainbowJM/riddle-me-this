<script lang="ts">
	import Logo from '../images/Logo.svelte';

	let data = [
		{ id: 1, name: 'John', points: 20 },
		{ id: 2, name: 'Jane', points: 25 },
		{ id: 3, name: 'Bob', points: 15 },
		{ id: 4, name: 'Bob', points: 10 },
		{ id: 5, name: 'Bob', points: 5 }
	];

	function calculatePointBarWidth(points) {
		return (points / 25) * 100 + '%';
	}
</script>

<div class="flex justify-center">
	<Logo />
</div>

{#each data as item (item.id)}
	<div class="card card-side bg-base-100 shadow-xl">
		<figure><img src="/logo.png" alt="Movie" /></figure>
		<div class="card-body">
			<h2 class="card-title">{item.id}</h2>
			<p>{item.name}</p>
			<div class="point-bar" style="width: {calculatePointBarWidth(item.points)}" />
			{item.points}
		</div>
	</div>
  <br>
{/each}

<style>
	/* You can add CSS styles for your table here */
	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}

	th {
		background-color: #f2f2f2;
	}

	tr:hover {
		background-color: #f5f5f5;
	}

	.point-bar {
		height: 10px;
		background-color: #007bff;
	}
</style>

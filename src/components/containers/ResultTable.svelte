<script>
	import Logo from '../images/Logo.svelte';

	let data = [
		{ id: 1, name: 'John', points: 20 },
		{ id: 2, name: 'Jane', points: 25 },
		{ id: 3, name: 'Bob', points: 15 },
		{ id: 4, name: 'Bob', points: 10 },
		{ id: 5, name: 'Bob', points: 5 }
	];

  // @ts-ignore
	function calculatePointBarWidth(points) {
		return (points / 25) * 100 + '%';
	}
</script>

<div class="flex justify-center">
	<Logo />
</div>

<div class="flex justify-center">
  <div class="flex flex-col items-center justify-center container">
    {#each data as item (item.id)}
		<div class="w-64 m-4 rounded-md bg-base-100 shadow-2xl md:w-4/5 shadow-indigo-950">
			<figure class="w-24 md:w-32 m-4"><img src="/logo.png"/></figure>
			<div class="card-body">
				<p>{item.name}</p>
				<section>
					<div class="h-4 rounded-md animate-gradient" style="width: {calculatePointBarWidth(item.points)}" />
					<div>{item.points} points</div>
				</section>
			</div>
		</div>
		<br />
	{/each}

  </div>
	
</div>

<style>
	/* figure {
		margin: 0;
	} */

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

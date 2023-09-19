<script lang="ts">
	import { onMount } from 'svelte';
	import IconChartBar from '~icons/mdi/chart-bar';
	import Avatar from './Avatar.svelte';
	import { allWinnerState, type DayWinnerFormat } from '../../store/standings';

	export let dayDate: string = '';

	let dayWinner: DayWinnerFormat[] = [];
	let winners;
	let scoreSumByName;
	let userArray: [] = [];
	let dataArray: [] = [];

	onMount(() =>
		allWinnerState.subscribe((state) => {
			winners = state;
			if (state[dayDate]) dayWinner = state[dayDate];
			scoreSumByName = sumScoresByName(winners);

			for (const key in scoreSumByName) {
				if (scoreSumByName.hasOwnProperty(key)) {
					dataArray.push({ name: key, score: scoreSumByName[key].score, photoURL: scoreSumByName[key].photoURL, email: scoreSumByName[key].email });
				}
			}
			userArray = dataArray;
            console.log(userArray)
		})
	);

	const calculatePointBarWidth = (points: number) => (points / 125) * 100 + '%';

	function sumScoresByName(data) {
		const scoreSumByName = {};

		for (const date in data) {
			if (data.hasOwnProperty(date)) {
				const objectsArray = data[date];
				for (const obj of objectsArray) {
					if (
						obj.hasOwnProperty('displayName') &&
						obj.hasOwnProperty('score') &&
						obj.hasOwnProperty('email') &&
						obj.hasOwnProperty('photoURL')
					) {
						const { displayName, score, email, photoURL } = obj;
						if (scoreSumByName.hasOwnProperty(displayName)) {
							scoreSumByName[displayName].score += score;
						} else {
							scoreSumByName[displayName] = { photoURL: photoURL, email: email, score: score };
						}
					}
				}
			}
		}

		return scoreSumByName;
	}
</script>

<div class="overflow-x-auto m-5 lg:flex">
	<div class="flex-1 flex gap-2 mt-1 mb-3">
		<IconChartBar />
		<h1 class="text-lg">
			<span>Ranking</span>
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
			{#each userArray as user, i}
                <!-- {#if i < 3} -->
				<tr>
					<td>
						<div class="flex items-center space-x-3">
							<Avatar photoURL={user.photoURL} displayName={user.displayName} />
							<div>
								<div class="font-bold">{user.name}</div>
								<div class="text-sm opacity-50">{user.email}</div>
							</div>
						</div>
					</td>
					<td>
						<div class="flex-1 flex flex-col">
							<div
								class="h-4 rounded-md animate-gradient"
								style="width: {calculatePointBarWidth(user.score)}"
							/>
							<div>{user.score} points</div>
						</div>
					</td>
				</tr>
                <!-- {/if} -->
			{/each}
		</tbody>
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

<script>
	import { enhance } from '$app/forms';
</script>

<form class="flex-1 flex justify-center" method="POST" action="?/guess" use:enhance>
	<div class="flex flex-col container p-10 gap-8 md:max-w-lg">
		<slot />
	</div>
</form>

<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/guess" use:enhance>
	<div class="w-full p-8 container flex flex-col container gap-8 md:max-w-lg">
		<slot />
	</div>
</form>

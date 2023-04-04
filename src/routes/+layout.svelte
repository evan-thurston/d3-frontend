<script>
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient";
	import { invalidate } from "$app/navigation";
	import "../app.postcss";
	import Navbar from "../lib/Navbar.svelte";

	let lightTheme = "lighttheme",
		darkTheme = "darkpinktheme",
		theme = darkTheme;

	$: inDarkMode = theme === darkTheme;

	const switchTheme = () => {
		theme === darkTheme ? (theme = lightTheme) : (theme = darkTheme);
	};

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(() => {
			invalidate("supabase:auth");
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<svelte:head>
	<title>D3 Frontend project</title>
	<meta name="description" content="Matlab clone using d3js & sveltekit" />
</svelte:head>

<main data-theme={theme} class="w-screen h-screen bg-base-100">
	<Navbar {inDarkMode} {switchTheme} />

	<slot />

	<!-- <button on:click={switchTheme}>
		{#if inDarkMode}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
				/>
			</svg>
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
				/>
			</svg>
		{/if}
	</button> -->
</main>

<!-- TODO: how to combine last two styles -->
<style lang="postcss">
	button {
		@apply btn btn-primary fixed bottom-8 right-8;
	}


	/*DOESNT WORK WITH NEW SVELTE UPDATE... NO CLUE WHY
	button:global {
		@apply btn btn-primary;
	}
	input[type='submit']:global {
		@apply btn-primary
	} */

    :global(p) {
        @apply text-xs font-mono;
    }
	:global(h2) {
		@apply text-4xl;
	}
	:global(h3) {
		@apply text-3xl;
	}
	:global(h4) {
		@apply text-2xl;
	}
	:global(h5) {
		@apply text-xl;
	}
	:global(h6) {
		@apply text-lg;
	}
	:global(input[type="text"]) {
		@apply input input-primary;
	}
</style>

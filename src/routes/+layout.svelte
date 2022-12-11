<script>
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient";
	import { invalidate } from "$app/navigation";
	import "../app.postcss";
	import Navbar from "../lib/Navbar.svelte";

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

<Navbar />

<slot />

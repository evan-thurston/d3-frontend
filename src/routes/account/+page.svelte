<script>
    import { page } from "$app/stores";
    import Account from "$lib/supabase/Account.svelte";
    import { browser } from '$app/environment';

    $: {
        if (browser && !$page.data.session) {
            window.location.href = "/";
        }
    }
</script>

{#if $page.data.session}
    <Account session={$page.data.session} />
{:else}
    <h1
        class="text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2"
    >
        redirecting you to the home page...
    </h1>
{/if}

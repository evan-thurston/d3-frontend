<script>
    import { page } from "$app/stores";
    import Account from "$lib/supabase/Account.svelte";
</script>

{#if $page.data.session}
    <Account session={$page.data.session} />
{/if}

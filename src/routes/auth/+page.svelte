<script>
    import { page } from "$app/stores";
    import Account from "$lib/supabase/Account.svelte";
    import SignIn from "$lib/supabase/SignIn.svelte";
</script>

{#if !$page.data.session}
    <SignIn />
{:else}
    <Account session={$page.data.session} />
{/if}

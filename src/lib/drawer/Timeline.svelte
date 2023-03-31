<script>
    export let updateList;
</script>

{#if updateList.length > 0}
    {#each updateList as date, i}
        <div>
            <h2>event {updateList.length - i}</h2>
            <p>timestamp: {date}</p>
        </div>
    {/each}
{:else}
    <h2 class="mx-8 mt-16">
        click the play button in the control panel to resume events!
    </h2>
{/if}

<style lang='postcss'>
    div {
        @apply bg-base-200 rounded-md my-4 p-4 mx-8
    }
    h2 {
        @apply text-3xl font-bold;
    }
    p {
        @apply text-xs font-mono
    }
</style>
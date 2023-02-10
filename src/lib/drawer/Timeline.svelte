<script>
    export let updateList;
</script>

{#if updateList.length > 0}
    {#each updateList as date, i}
        <div class="bg-primary rounded-md m-4 p-4">
            <h2 class="text-3xl font-bold">event {updateList.length - i}</h2>
            <p class="text-xs font-mono">timestamp: {date}</p>
        </div>
    {/each}
{:else}
    <h2 class="text-3xl font-bold mx-8 mt-16">
        click the play button in the control panel to resume events!
    </h2>
{/if}

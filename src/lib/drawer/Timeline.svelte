<script>
    import Filter from './Filter.svelte';

    export let updateList, updatesPaused, parseTargets;

    let idList = [],
        groupList = [],
        outList = [];

    $: filteredIdList = idList.filter((val) => val !== '');
    $: filteredGroupList = groupList.filter((val) => val !== '');
    $: filteredOutList = outList.filter((val) => val !== '');
</script>

<Filter
    bind:idList
    bind:groupList
    bind:outList
/>
<div class="wrapper">
    {#if updateList.length > 0}
        {#each updateList as update, i}
            {#if (filteredIdList.length === 0 || filteredIdList.includes(update.id)) && (filteredGroupList.length === 0 || filteredGroupList.includes(update.group.toString())) && (filteredOutList.length === 0 || (update.targets && filteredOutList.some( (val) => parseTargets(update.targets).includes(val) )))}
                <div>
                    <h3 class="uppercase">event {updateList.length - i}</h3>
                    <h5>
                        emitter: {update.id} (group {update.group})
                    </h5>
                    <h5>targets: {parseTargets(update.targets)}</h5>
                    <p>timestamp: {update.timestamp}</p>
                </div>
            {/if}
        {/each}
    {:else}
        <div class="text-center w-full">
            <h3 class="uppercase font-bold">no events detected so far</h3>
            <h6>
                events are currently {updatesPaused ? 'disabled' : 'enabled'}
            </h6>
            <button
                class="mt-2 {updatesPaused
                    ? 'primaryButton'
                    : 'disabledButton'}"
                on:click={() => (updatesPaused = !updatesPaused)}
            >
                enable events
            </button>
        </div>
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply mx-8 flex flex-col space-y-4 my-8;
    }
    .wrapper > div {
        @apply bg-base-200 rounded-md p-4;
    }
</style>

<script>
    import { lesMis, dummyNodes } from "$lib/utils";

    export let selectSimulation;

    let preset,
        presetData = [],
        presetSelected = false;

    const selectPreset = (id) => {
        presetSelected = true;
        preset = id;
        preset === 0 ? (presetData = dummyNodes) : (presetData = lesMis);
    };
</script>

{#if !presetSelected}
    <div class="grid grid-cols-2 p-32 gap-8 h-full">
        <button class="btn btn-primary h-full" on:click={() => selectPreset(0)}>
            <p class="my-16">Dummy Dataset</p>
        </button>
        <button class="btn btn-primary h-full" on:click={() => selectPreset(1)}>
            <p class="my-16">Les Mis Visualization</p>
        </button>
    </div>
{:else}
    <div
        class="flex flex-col space-y-8 pt-32 pb-16 text-center h-full overflow-y-scroll"
    >
        <h3 class="text-3xl">
            simulation {preset === 0 ? "dummyNodes" : "lesMis"}
        </h3>

        <form
            class="flex flex-col space-y-8 mx-auto"
            on:submit={() => {
                selectSimulation(presetData);
            }}
        >
            <input type="submit" />
            <div class="flex flex-row space-x-4 justify-around">
                <p>id</p>
                <p>group</p>
                <p>out</p>
            </div>
            {#each presetData.nodes as obj}
                <div class="flex flex-row space-x-4">
                    <input type="text" bind:value={obj.id} />
                    <input type="text" bind:value={obj.group} />
                    <input type="text" bind:value={obj.out} />
                </div>
            {/each}
        </form>
    </div>
{/if}

<style lang="postcss">
    input[type="text"] {
        @apply input input-primary;
    }
    input[type="submit"] {
        @apply btn btn-primary;
    }
</style>

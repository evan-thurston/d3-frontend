<script>
    import { scale, fade, slide } from "svelte/transition";

    import Highlight from "$lib/Highlight.svelte";
    import DrawerModal from "$lib/drawer/DrawerModal.svelte";

    export let nodes, deleteNode, selectedNodes, selectNode, nodeSelected;

    let tickerPaused = false,
        tickerData;

    $: if (!tickerPaused) tickerData = nodes;
</script>

<div class="flex flex-col-reverse xl:flex-row xl:space-x-8 bg-base-100 px-8">
    <div class="ticker">
        <h3>ID:</h3>
        <h3>group:</h3>
        <h3>out:</h3>
        <h3>x:</h3>
        <h3>y:</h3>
        <h3>delete</h3>
        {#each tickerData as node}
            <button
                on:click={selectNode(node.id)}
                class="rounded-l-xl"
                id={node.id}
            >
                <p title={node.id}>
                    <Highlight value={node.id}>{node.id}</Highlight>
                </p>
            </button>
            <div><div class='my-auto'><Highlight value={node.group}>{node.group}</Highlight></div></div>
            <div><div class='my-auto'>
                {#if node.out}
                    {#if typeof node.out[0] === "string"}
                        {#each node.out as out}
                            <p title={out}>
                                <Highlight value={out}>{out}</Highlight>
                            </p>
                        {/each}
                    {:else}
                        <p title={node.out}>
                            <Highlight value={node.out}>{node.out}</Highlight>
                        </p>
                    {/if}
                {:else}
                    none
                {/if}
            </div>
            </div>
            <div>
                <div class="my-auto">
                <Highlight value={Math.round(node.x)}
                    >{Math.round(node.x)}</Highlight
                >
            </div>
            </div>
            <div>
                <div class="my-auto">
                <Highlight value={Math.round(node.y)}
                    >{Math.round(node.y)}</Highlight
                >
            </div>
            </div>
            <button
                on:click={deleteNode(node.id)}
                class:btn-disabled={tickerData.length < 6}
                class="rounded-r-xl "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mx-auto"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
            {#if nodeSelected(node.id)}
                <section
                    class="col-span-6 transition-transform"
                    in:scale 
                    out:slide
                >
                    <!-- {#key selectedNodes} -->
                        <DrawerModal {node} />
                    <!-- {/key} -->
                </section>
            {/if}
        {/each}
    </div>
    <!-- <div class="controls">
        <button
            on:click={() => {
                toggleTicker();
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12 mx-auto"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
        <button class='mr-4 xl:mr-0' on:click={() => (tickerPaused = !tickerPaused)}>
            {#if tickerPaused}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-12 h-12 mx-auto"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-12 h-12 mx-auto"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                    />
                </svg>
            {/if}
        </button>
    </div> -->
</div>

<style lang="postcss">
    .ticker {
        @apply grid grid-cols-6 flex-grow;
    }

    .ticker div {
        @apply bg-primary my-2 py-4 text-center text-xl font-bold uppercase;
    }

    .ticker button {
        @apply btn-primary my-2 py-4 text-neutral-content font-bold text-xl text-center;
    }

    .ticker > button, .ticker > div {
        @apply border-x border-black border-opacity-20
    }

    .ticker div p {
        @apply text-ellipsis overflow-hidden;
    }

    .ticker h3 {
        @apply my-4 py-4 text-center text-lg 2xl:text-2xl font-bold uppercase sticky top-0 bg-base-100;
    }

    .controls {
        @apply flex flex-row-reverse xl:space-x-0 xl:flex-col xl:space-y-4 ml-auto xl:ml-8 xl:mt-8;
    }

    .controls button {
        @apply btn-ghost bg-base-300 rounded-xl;
    }
</style>

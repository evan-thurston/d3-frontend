<script>
    import { scale, fade, slide } from "svelte/transition";

    import Highlight from "$lib/Highlight.svelte";
    import DrawerModal from "$lib/drawer/DrawerModal.svelte";

    export let nodes, deleteNode, selectedNodes, selectNode, nodeSelected;

    let tickerPaused = false,
        tickerData;

    $: if (!tickerPaused) tickerData = nodes;
</script>

<main class="wrapper">
    <div class="legend">
        <p>ID:</p>
        <p>group:</p>
        <p>out:</p>
        <p>x:</p>
        <p>y:</p>
        <p>delete</p>
    </div>
    <div class="ticker">
        {#each tickerData as node}
            <div>
                <div>
                    <button on:click={selectNode(node.id)} id={node.id}>
                        <h4 title={node.id}>
                            <Highlight value={node.id}>{node.id}</Highlight>
                        </h4>
                    </button>
                    <div>
                        <h5>
                            <Highlight value={node.group}
                                >{node.group}</Highlight
                            >
                        </h5>
                    </div>
                    <div>
                        {#if node.out}
                            {#if node.out.some((val) => {
                                return typeof val === "string";
                            })}
                                {#each node.out as out}
                                    <h5 title={out}>
                                        <Highlight value={out}>{out}</Highlight>
                                    </h5>
                                {/each}
                            {:else}
                                <h5 title={node.out}>
                                    <Highlight value={node.out}
                                        >{node.out}</Highlight
                                    >
                                </h5>
                            {/if}
                        {:else}
                            <h5>null</h5>
                        {/if}
                    </div>
                    <div>
                        <h5>
                            <Highlight value={Math.round(node.x)}
                                >{Math.round(node.x)}</Highlight
                            >
                        </h5>
                    </div>
                    <div>
                        <h5>
                            <Highlight value={Math.round(node.y)}
                                >{Math.round(node.y)}</Highlight
                            >
                        </h5>
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
                </div>
                {#if nodeSelected(node.id)}
                    <div
                        in:slide={{ duration: 400 }}
                        out:slide={{ duration: 400 }}
                    >
                        <!-- {#key selectedNodes} -->
                        <DrawerModal bind:node />
                        <!-- {/key} -->
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</main>

<style lang="postcss">
    .wrapper {
        @apply flex flex-col;
    }
    .legend {
        @apply flex flex-row justify-around bg-base-100 border-2 border-primary p-4 mt-4 rounded-xl sticky top-4 mx-8;
    }
    .ticker {
        @apply flex flex-col;
    }
    .ticker > div {
        @apply bg-base-200 mx-8 rounded-xl mt-4;
    }
    .ticker > div > div {
        @apply flex flex-row justify-between;
    }
    .ticker > div > div > div {
        @apply my-auto;
    }
    button {
        @apply btn btn-ghost px-8;
    }
</style>

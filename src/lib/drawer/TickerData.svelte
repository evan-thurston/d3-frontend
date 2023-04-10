<script>
    import { slide } from 'svelte/transition';

    import Plus from '../icons/Plus.svelte';
    import Highlight from '$lib/Highlight.svelte';
    import Trashcan from '../icons/Trashcan.svelte';
    import DrawerModal from './DrawerModal.svelte';

    export let nodes,
        filteredIdList,
        filteredGroupList,
        filteredOutList,
        selectNode,
        parseTargets;
</script>

<div class="ticker">
    {#each nodes as node}
        {#if (filteredIdList.length === 0 || filteredIdList.includes(node.id)) && (filteredGroupList.length === 0 || filteredGroupList.includes(node.group.toString())) && (filteredOutList.length === 0 || (node.out && filteredOutList.some( (val) => parseTargets(node.out).includes(val) )))}
            <p
                class="relative invisible -top-16"
                id={node.id}
            />
            <div>
                <div>
                    <button
                        class="nodeButton"
                        on:click={selectNode(node.id)}
                    >
                        <h6
                            class="overflow-hidden font-bold text-ellipsis"
                            title={node.id}
                        >
                            <Highlight value={node.id}>{node.id}</Highlight>
                        </h6>
                    </button>
                    <div>
                        <h6>
                            <Highlight value={node.group}
                                >{node.group}</Highlight
                            >
                        </h6>
                    </div>
                    <div>
                        {#if node.out}
                            <div class="flex flex-col space-y-2">
                                {#each parseTargets(node.out) as out}
                                    {#if out}
                                        <h6
                                            class="p-2 bg-base-300 rounded-xl"
                                            title={out}
                                        >
                                            <Highlight value={out}
                                                >{out}</Highlight
                                            >
                                        </h6>
                                    {/if}
                                {/each}
                            </div>
                        {:else}
                            <h6
                                class="p-2 bg-base-300 rounded-xl"
                                title="NONE"
                            >
                                NONE
                            </h6>
                        {/if}
                    </div>
                    <div>
                        <h6>
                            <Highlight value={Math.round(node.x)}
                                >{Math.round(node.x)}</Highlight
                            >
                        </h6>
                    </div>
                    <div>
                        <h6>
                            <Highlight value={Math.round(node.y)}
                                >{Math.round(node.y)}</Highlight
                            >
                        </h6>
                    </div>

                    <!-- on:click={deleteNode(node.id)} -->
                    <button
                        class:btn-disabled={nodes.length < 2}
                        class="nodeButton"
                    >
                        <Trashcan />
                    </button>
                </div>
                {#if node.selected}
                    <div transition:slide={{ duration: 400 }}>
                        <div class="col-span-6">
                            <DrawerModal bind:node />
                        </div>
                    </div>
                {/if}
            </div>
        {/if}
    {/each}

    <!-- on:click={addNode} -->
    <button class="addNode">
        <Plus />
    </button>
</div>

<style lang="postcss">
    .ticker {
        @apply flex flex-col;
    }
    .ticker > div {
        @apply bg-base-200 mx-8 rounded-xl mt-4 p-4;
    }
    .ticker > div > div {
        @apply grid grid-cols-6;
    }
    .ticker > div > div > div,
    .ticker > div > div > button {
        @apply my-auto text-center;
    }
    button.nodeButton {
        @apply btn btn-ghost bg-base-300 h-full;
    }
    button.addNode {
        @apply btn btn-primary mx-8 my-4;
    }
    h6 {
        @apply font-mono;
    }
</style>

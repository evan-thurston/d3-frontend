<script>
    import { slide } from 'svelte/transition';

    import Highlight from '$lib/Highlight.svelte';
    import DrawerModal from '../modal/DrawerModal.svelte';

    import Plus from '$lib/icons/Plus.svelte';
    import Trashcan from '$lib/icons/Trashcan.svelte';

    export let nodes,
        filteredIdList,
        filteredGroupList,
        filteredOutList,
        selectNode,
        parseTargets,
        addNode,
        deleteNode;
</script>

<main>
    {#each nodes as node}
        {#if (filteredIdList.length === 0 || filteredIdList.includes(node.id)) && (filteredGroupList.length === 0 || filteredGroupList.includes(node.group.toString())) && (filteredOutList.length === 0 || (node.out && filteredOutList.some( (val) => parseTargets(node.out).includes(val) )))}
            <!-- ANCHOR FOR BROWSER TO JUMP TO WHEN NODE IS SELECTED -->
            <p
                class="relative invisible -top-16"
                id={node.id}
            />
            <div class="nodeContainer">
                <!-- <div> -->
                <!-- <p class="dataLabel">id:</p> -->
                <button
                    class="nodeButton"
                    on:click={selectNode(node.id)}
                >
                    <h4
                        class="overflow-hidden font-bold text-ellipsis"
                        title={node.id}
                    >
                        <span class="dataLabel">id:</span>

                        <Highlight value={node.id}>{node.id}</Highlight>
                    </h4>
                </button>
                <!-- </div> -->
                <div>
                    <span class="dataLabel">group:</span>
                    <span>
                        <Highlight value={node.group}>{node.group}</Highlight>
                    </span>
                </div>
                <div class="hidden xl:block">
                    {#if node.out && parseTargets(node.out).length > 0}
                        <div class="flex flex-col space-y-2">
                            {#each parseTargets(node.out) as out}
                                {#if out}
                                    <h6
                                        class="p-2 bg-base-300 rounded-xl"
                                        title={out}
                                    >
                                        <Highlight value={out}>{out}</Highlight>
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
                <div class="xl:hidden">
                    <span class="dataLabel">out:</span>
                    <span class="dataLabel">
                        <Highlight value={node.out || []}>
                            [{(node.out && parseTargets(node.out)) || []}]
                        </Highlight>
                    </span>
                </div>
                <div>
                    <h6>
                        <span class="dataLabel">x:</span>
                        <Highlight value={Math.round(node.x)}>
                            {Math.round(node.x)}
                        </Highlight>
                    </h6>
                </div>
                <div>
                    <h6>
                        <span class="dataLabel">y:</span>
                        <Highlight value={Math.round(node.y)}>
                            {Math.round(node.y)}
                        </Highlight>
                    </h6>
                </div>
                <button
                    class:btn-disabled={nodes.length < 2}
                    class="nodeButton"
                    on:click={deleteNode(node.id)}
                >
                    <Trashcan />
                </button>

                {#if node.selected}
                    <div
                        class="xl:col-span-6"
                        transition:slide={{ duration: 400 }}
                    >
                        <DrawerModal bind:node />
                    </div>
                {/if}
            </div>
        {/if}
    {/each}

    <button
        on:click={addNode}
        class="addNode"
    >
        <Plus />
    </button>
</main>

<style lang="postcss">
    main {
        @apply flex flex-col mx-4 xl:mx-8 mb-20 xl:mb-0;
    }
    .nodeContainer {
        @apply border-2 border-base-300 bg-base-200 rounded-xl mt-4 p-4 grid xl:grid-cols-6 gap-2;
    }
    .nodeContainer > div {
        /* @apply flex flex-row space-x-4 items-center; */
        @apply text-center my-auto;
    }
    .dataLabel {
        @apply xl:hidden;
    }
    button.nodeButton {
        @apply btn btn-primary w-full h-full;
    }
    button.addNode {
        @apply btn btn-primary my-4;
    }
    h6 {
        @apply font-mono;
    }
</style>

<script>
    import { scale, fade, slide } from "svelte/transition";

    import Highlight from "$lib/Highlight.svelte";
    import DrawerModal from "$lib/drawer/DrawerModal.svelte";

    export let nodes,
        addNode,
        deleteNode,
        selectedNodes,
        selectNode,
        nodeSelected;

    let tickerPaused = false,
        tickerData,
        idList = [],
        groupList = [],
        outList = [],
        filteredIdList,
        filteredGroupList,
        filteredOutList;

    const parseTargets = (targets) => {
        let targetList = [];
        targets.forEach((target) => {
            if (typeof target === "number") {
                let groupNodes = nodes.filter(({ group }) => group === target);
                groupNodes.forEach((node) => {
                    targetList.push(node.id);
                });
            } else {
                targetList.push(target);
            }
        });
        return targetList;
    };

    $: if (!tickerPaused) tickerData = nodes;
    $: filteredIdList = idList.filter((val) => val !== "");
    $: filteredGroupList = groupList.filter((val) => val !== "");
    $: filteredOutList = outList.filter((val) => val !== "");
</script>

<main class="wrapper">
    <h6 class="uppercase mx-8 mt-4">filter:</h6>
    <div class="filter">
        <div>
            <p>emitter id:</p>
            {#each idList as _, i}
                <div>
                    <input type="text" bind:value={idList[i]} size={4} />
                    <button
                        on:click={() => {
                            idList.splice(i, 1);
                            idList = idList;
                        }}
                        ><svg
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
                        </svg></button
                    >
                </div>
            {/each}
            <button on:click={() => (idList = [...idList, ""])}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg></button
            >
        </div>
        <div>
            <p>emitter group:</p>
            {#each groupList as _, i}
                <div>
                    <input type="text" bind:value={groupList[i]} size={4} />
                    <button
                        on:click={() => {
                            groupList.splice(i, 1);
                            groupList = groupList;
                        }}
                        ><svg
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
                        </svg></button
                    >
                </div>
            {/each}
            <button on:click={() => (groupList = [...groupList, ""])}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg></button
            >
        </div>
        <div>
            <p>targets:</p>
            {#each outList as _, i}
                <div>
                    <input type="text" bind:value={outList[i]} size={4} />
                    <button
                        on:click={() => {
                            outList.splice(i, 1);
                            outList = outList;
                        }}
                        ><svg
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
                        </svg></button
                    >
                </div>
            {/each}
            <button on:click={() => (outList = [...outList, ""])}
                ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg></button
            >
        </div>
    </div>
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
            {#if (filteredIdList.length === 0 || filteredIdList.includes(node.id)) && (filteredGroupList.length === 0 || filteredGroupList.includes(node.group.toString())) && (filteredOutList.length === 0 || (node.out && filteredOutList.some( (val) => parseTargets(node.out).includes(val) )))}
                <p class="invisible relative -top-16" id={node.id} />
                <div>
                    <div>
                        <button
                            class="nodeButton"
                            on:click={selectNode(node.id)}
                        >
                            <h6
                                class="overflow-hidden text-ellipsis font-bold"
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
                                <!-- {#if node.out.some((val) => {
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
                                {/if} -->
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
                                <h5>null</h5>
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
                        <button
                            on:click={deleteNode(node.id)}
                            class:btn-disabled={tickerData.length < 2}
                            class="nodeButton"
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
                            <div class="col-span-6">
                                <!-- {#key selectedNodes} -->
                                <DrawerModal bind:node />
                                <!-- {/key} -->
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        {/each}
        <button on:click={addNode} class="addNode"
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                />
            </svg></button
        >
    </div>
</main>

<style lang="postcss">
    .wrapper {
        @apply flex flex-col;
    }
    .filter {
        @apply grid grid-cols-3 gap-2 bg-base-100 border-2 border-primary p-4 mt-2 rounded-xl mx-8;
    }
    .filter > div {
        @apply flex flex-col space-y-2;
    }
    .filter > div > div {
        @apply flex flex-row space-x-4;
    }
    .legend {
        @apply flex flex-row justify-around bg-base-100 border-2 border-primary p-4 mt-4 rounded-xl sticky top-4 mx-8;
    }
    .ticker {
        @apply flex flex-col;
    }
    .ticker > div {
        @apply bg-base-200 mx-8 rounded-xl mt-4 p-4;
    }
    .ticker > div > div {
        /* @apply flex flex-row justify-between; */
        @apply grid grid-cols-6;
    }
    .ticker > div > div > div,
    .ticker > div > div > button {
        @apply my-auto text-center;
    }
    button {
        @apply btn btn-primary;
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

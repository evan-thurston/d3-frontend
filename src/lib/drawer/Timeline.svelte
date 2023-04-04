<script>
    export let updateList, nodes;

    let targetList = "",
        idList = [],
        groupList = [],
        outList = [];

    const parseTargets = (targets) => {
        targetList = [];
        targets.forEach((target) => {
            if (typeof target === "number") {
                let groupNodes = nodes.filter(({ group }) => group === target);
                groupNodes.forEach((node) => {
                    targetList = targetList += node.id + ", ";
                });
            } else {
                targetList = targetList += target + ", ";
            }
        });
        return targetList.slice(0, targetList.length - 2);
    };

    $: filteredIdList = idList.filter((val) => val !== "");
    $: filteredGroupList = groupList.filter((val) => val !== "");
    $: filteredOutList = outList.filter((val) => val !== "");
</script>

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

<div class="wrapper">
    {#if updateList.length > 0}
        {#each updateList as update, i}
            {#if (filteredIdList.length === 0 || filteredIdList.includes(update.emitter)) && (filteredGroupList.length === 0 || filteredGroupList.includes(update.emitterGroup.toString())) && (filteredOutList.length === 0 || (update.targets && filteredOutList.some( (val) => parseTargets(update.targets).includes(val) )))}
                <div>
                    <h2>event {updateList.length - i}</h2>
                    <h6>emitter: {update.emitter} (group {update.emitterGroup})</h6>
                    <!-- <h6>emitter group: {update.emitterGroup}</h6> -->
                    <h6>targets: {parseTargets(update.targets)}</h6>
                    <p>timestamp: {update.timestamp}</p>
                </div>
            {/if}
        {/each}
    {:else}
        <h2>click the play button in the control panel to resume events!</h2>
    {/if}
</div>

<style lang="postcss">
    .filter {
        @apply grid grid-cols-3 gap-2 bg-base-100 border-2 border-primary p-4 mt-2 rounded-xl sticky top-4 mx-8;
    }
    .filter > div {
        @apply flex flex-col space-y-2;
    }
    .filter > div > div {
        @apply flex flex-row space-x-4;
    }
    .wrapper {
        @apply mx-8 flex flex-col space-y-4 my-8;
    }
    .wrapper > div {
        @apply bg-base-200 rounded-md p-4;
    }
    h2 {
        @apply font-bold;
    }
    h6 {
        @apply font-mono;
    }
    button {
        @apply btn btn-primary;
    }
</style>

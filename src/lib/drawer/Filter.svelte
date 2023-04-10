<script>
    import Plus from '../icons/Plus.svelte';
    import Trashcan from '../icons/Trashcan.svelte';

    export let idList, groupList, outList;
</script>

<h6 class="mx-8 mt-4 uppercase">filter:</h6>
<div class="filter">
    <div>
        <p>emitter id:</p>
        {#each idList as _, i}
            <div>
                <input
                    class="borderInput"
                    type="text"
                    bind:value={idList[i]}
                    size={4}
                />
                <button
                    class="primaryButton"
                    on:click={() => {
                        idList.splice(i, 1);
                        idList = idList;
                    }}
                >
                    <Trashcan />
                </button>
            </div>
        {/each}
        <button
            class="primaryButton"
            on:click={() => (idList = [...idList, ''])}
        >
            <Plus />
        </button>
    </div>
    <div>
        <p>emitter group:</p>
        {#each groupList as _, i}
            <div>
                <input
                    class="borderInput"
                    type="text"
                    bind:value={groupList[i]}
                    size={4}
                />
                <button
                    class="primaryButton"
                    on:click={() => {
                        groupList.splice(i, 1);
                        groupList = groupList;
                    }}
                >
                    <Trashcan />
                </button>
            </div>
        {/each}
        <button
            class="primaryButton"
            on:click={() => (groupList = [...groupList, ''])}
        >
            <Plus />
        </button>
    </div>
    <div>
        <p>targets:</p>
        {#each outList as _, i}
            <div>
                <input
                    class="borderInput"
                    type="text"
                    bind:value={outList[i]}
                    size={4}
                />
                <button
                    class="primaryButton"
                    on:click={() => {
                        outList.splice(i, 1);
                        outList = outList;
                    }}
                >
                    <Trashcan />
                </button>
            </div>
        {/each}
        <button
            class="primaryButton"
            on:click={() => (outList = [...outList, ''])}><Plus /></button
        >
    </div>
</div>

<style lang="postcss">
    .filter {
        @apply grid grid-cols-3 gap-2 bg-base-200 border-2 border-base-300 p-4 mt-2 rounded-xl mx-8;
    }
    .filter > div {
        @apply flex flex-col space-y-2;
    }
    .filter > div > div {
        @apply flex flex-row space-x-4;
    }
</style>

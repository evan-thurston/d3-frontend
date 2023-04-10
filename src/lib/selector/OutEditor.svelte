<script>
    import Plus from '../icons/Plus.svelte';
    import Trashcan from '../icons/Trashcan.svelte';

    export let out;
</script>

<div class="outWrapper">
    {#if Array.isArray(out)}
        {#each out as _, i}
            <div class="outRow">
                <input
                    class="w-full borderInput"
                    type="text"
                    on:input={(e) =>
                        (out[i] = /\d/.test(e.target.value)
                            ? Number(e.target.value)
                            : e.target.value)}
                    value={out[i]}
                />
                <button
                    class="primaryButton"
                    type="button"
                    on:click={() => {
                        out = [...out.filter((val) => val != out[i])];
                    }}
                >
                    <Trashcan />
                </button>
            </div>
        {/each}
    {/if}
    <button
        class="primaryButton"
        type="button"
        on:click={() => {
            out = Array.isArray(out) ? [...out, ''] : [''];
        }}
    >
        <Plus />
    </button>
</div>

<style lang="postcss">
    div.outWrapper {
        @apply flex flex-col space-y-2 xl:space-y-4 w-full;
    }
    div.outRow {
        @apply flex flex-row space-x-2 xl:space-x-4;
    }
</style>

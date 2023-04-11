<script>
    import Plus from '../../icons/Plus.svelte';
    import Trashcan from '../../icons/Trashcan.svelte';

    export let name, arr;
</script>

<main>
    <p>{name}:</p>
    {#each arr as _, i}
        <div>
            <input
                class="w-full borderInput"
                type="text"
                bind:value={arr[i]}
            />
            <button
                class="primaryButton"
                on:click={() => {
                    arr.splice(i, 1);
                    arr = arr;
                }}
            >
                <Trashcan />
            </button>
        </div>
    {/each}
    <button
        class="primaryButton"
        on:click={() => {
            arr = [...arr, ''];
        }}
    >
        <Plus />
    </button>
</main>

<style lang="postcss">
    main {
        @apply flex flex-col space-y-2;
    }
    main > div {
        @apply flex flex-row space-x-4;
    }
</style>

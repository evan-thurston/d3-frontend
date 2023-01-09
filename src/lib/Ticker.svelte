<script>
    export let newData, deleteNode, toggleTicker;

    let tickerPaused = false, tickerData;

    $: if(!tickerPaused) tickerData = newData;
</script>

<div class="ticker">
    <div class="col-span-4 rounded-l-xl controls">tickerboard title/controls</div>
    <button class='controls' on:click={() => (tickerPaused = !tickerPaused)}>
        {#if tickerPaused}
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
                class="w-6 h-6 mx-auto"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
            </svg>
        {/if}
    </button>
    <button
        class="rounded-r-xl controls"
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
            class="w-6 h-6 mx-auto"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>

    <h3>ID:</h3>
    <h3>group:</h3>
    <h3>out:</h3>
    <h3>x:</h3>
    <h3>y:</h3>
    <h3>delete</h3>
    {#each tickerData as node}
        <div class="rounded-l-xl"><p title={node.id}>{node.id}</p></div>
        <div>{node.group}</div>
        <div>
            {#if node.out}
                {#if typeof node.out[0] === "string"}
                    {#each node.out as out}
                        <p title={out}>{out}</p>
                    {/each}
                {:else}
                    <p title={node.out}>{node.out}</p>
                {/if}
            {:else}
                none
            {/if}
        </div>
        <div>{Math.round(node.x)}</div>
        <div>{Math.round(node.y)}</div>
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
    {/each}
</div>

<style lang="postcss">
    .ticker {
        @apply my-8 px-8 grid grid-cols-6 bg-base-100;
    }

    .ticker div {
        @apply bg-primary my-4 py-4 text-center text-xl font-bold uppercase border-x border-black border-opacity-20;
    }

    .ticker div.controls {
        @apply bg-base-300
    }

    .ticker button {
        @apply btn-primary my-4 py-4 border-x border-black border-opacity-20 text-neutral-content font-bold text-xl text-center;
    }

    .ticker button.controls {
        @apply btn-ghost bg-base-300
    }

    .ticker div p {
        @apply text-ellipsis overflow-hidden;
    }

    .ticker h3 {
        @apply my-4 py-4 text-center text-2xl font-bold uppercase sticky top-0 bg-base-100;
    }
</style>

<script>
    export let newData, deleteNode;
</script>

<div class="ticker">
    <h3>ID:</h3>
    <h3>group:</h3>
    <h3>out:</h3>
    <h3>x:</h3>
    <h3>y:</h3>
    <h3>delete</h3>
    {#each newData as node}
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
        <button on:click={deleteNode(node.id)} class:btn-disabled={newData.length < 6}>X</button>
    {/each}
</div>

<style lang="postcss">
    .ticker {
        @apply my-8 pr-8 grid grid-cols-6 bg-base-100;
    }

    .ticker div {
        @apply bg-primary my-4 py-4 text-center text-xl font-bold uppercase border-x border-black border-opacity-20;
    }

    .ticker button {
        @apply rounded-r-xl btn-primary  my-4 border-x border-black border-opacity-20 text-neutral-content font-bold text-xl;
    }

    .ticker div p {
        @apply text-ellipsis overflow-hidden;
    }

    .ticker h3 {
        @apply mb-4 py-4 text-center text-2xl font-bold uppercase sticky top-0 bg-base-100;
    }
</style>

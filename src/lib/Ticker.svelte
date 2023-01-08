<script>
    export let newData;
</script>

<div class="ticker">
    <h3>ID:</h3>
    <h3>group:</h3>
    <h3>out:</h3>
    <h3>x:</h3>
    <h3>y:</h3>
    {#each newData as node}
        <div class="rounded-l-xl">{node.id}</div>
        <div>{node.group}</div>
        <div>{node.out || "none"}</div>
        <div>{Math.round(node.x)}</div>
        <div class="rounded-r-xl">{Math.round(node.y)}</div>
    {/each}
</div>

<style lang="postcss">
    .ticker {
        @apply mt-8 my-8 grid grid-cols-5 bg-base-100;
    }

    .ticker div {
        @apply bg-primary my-4 py-4 text-center text-xl font-bold uppercase border-x border-black border-opacity-20;
    }

    .ticker h3 {
        @apply my-4 py-4 text-center text-2xl font-bold uppercase;
    }
</style>

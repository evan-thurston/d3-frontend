<script>
    export let updateList, nodes;

    let targetList = [];

    const parseTargets = (targets) => {
        targetList = [];
        targets.forEach(target => {
            if(typeof target === "number") {
                let groupNodes = nodes.filter(({group}) => group === target);
                groupNodes.forEach(node => {
                    targetList.push(node.id)
                });
            } else {
                targetList.push(target)
            }
        });
        return targetList
    }
</script>

{#if updateList.length > 0}
    {#each updateList as update, i}
        <div>
            <h2>event {updateList.length - i}</h2>
            <p>timestamp: {update.timestamp}</p>
            <p>emitter: {update.emitter}</p>
            <p>targets: {parseTargets(update.targets)}</p>
        </div>
    {/each}
{:else}
    <h2 class="mx-8 mt-16">
        click the play button in the control panel to resume events!
    </h2>
{/if}

<style lang='postcss'>
    div {
        @apply bg-base-200 rounded-md my-4 p-4 mx-8
    }
    h2 {
        @apply text-3xl font-bold;
    }
    p {
        @apply text-xs font-mono
    }
</style>
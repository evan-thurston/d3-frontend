<script>
    export let updateList, nodes;

    let targetList = "";

    const parseTargets = (targets) => {
        targetList = [];
        targets.forEach((target) => {
            if (typeof target === "number") {
                let groupNodes = nodes.filter(({ group }) => group === target);
                groupNodes.forEach((node) => {
                    targetList = targetList += node.id + ', ';
                });
            } else {
                targetList = targetList += target + ', ';
            }
        });
        return targetList.slice(0, targetList.length - 2);
    };
</script>

<div class="wrapper">
    {#if updateList.length > 0}
        {#each updateList as update, i}
            <div>
                <h2>event {updateList.length - i}</h2>
                <h6>emitter: {update.emitter}</h6>
                <h6>targets: {parseTargets(update.targets)}</h6>
                <p>timestamp: {update.timestamp}</p>
            </div>
        {/each}
    {:else}
        <h2>
            click the play button in the control panel to resume events!
        </h2>
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply mx-8 flex flex-col space-y-4 my-8
    }
    .wrapper > div {
        @apply bg-base-200 rounded-md p-4;
    }
    p {
        @apply text-xs font-mono;
    }
    h2 {
        @apply font-bold
    }
    h6 {
        @apply font-mono;
    }
</style>

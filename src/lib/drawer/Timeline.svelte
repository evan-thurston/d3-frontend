<script>
    export let updateList, nodes;

    let targetList = "",
        id,
        out,
        group;

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
</script>

<h6 class="uppercase mx-8 mt-4">filter:</h6>
<div class="filter">
    <p>
        <label for="id">emitter id:</label>
        <input id="id" type="text" bind:value={id} size={7} />
    </p>
    <p>
        <label for="group">emitter group:</label>
        <input id="group" type="text" bind:value={group} size={7} />
    </p>
    <p>
        <label for="out">targets:</label>
        <input id="out" type="text" bind:value={out} size={7} />
    </p>
</div>

<div class="wrapper">
    {#if updateList.length > 0}
        {#each updateList as update, i}
            {#if 
                (!id || update.emitter === id) 
                && (!group || update.emitterGroup.toString() === group)
                && (!out || parseTargets(update.targets).includes(out))
            }
                <div>
                    <h2>event {updateList.length - i}</h2>
                    <h6>emitter: {update.emitter}</h6>
                    <h6>emitter: {update.emitterGroup}</h6>
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
        @apply flex flex-row justify-around bg-base-100 border-2 border-primary p-4 mt-2 rounded-xl sticky top-4 mx-8;
    }
    .filter > p {
        @apply flex flex-col space-y-2;
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
</style>

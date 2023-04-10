<script>
    import DrawerControls from './DrawerControls.svelte';
    import Ticker from './Ticker.svelte';
    import Timeline from './Timeline.svelte';

    // export let nodes,
    //     addNode,
    //     deleteNode,
    //     selectNode,
    //     nodeSelected,
    //     updateList,
    //     updatesPaused,
    //     toggleUpdates;

    export let nodes, selectedNodes, selectNode, updatesPaused, updateList;

    const parseTargets = (targets) => {
        let targetList = [];
        targets.forEach((target) => {
            if (typeof target === 'number') {
                let groupNodes = nodes.filter(({ group }) => group === target);
                groupNodes.forEach((node) => {
                    targetList.push(node.id);
                });
            } else {
                targetList.push(target);
            }
        });
        return targetList;
    };

    //currentView: 0 => tickerboard, 1 => timeline
    let open = false,
        currentView = 0;
</script>

<div class="wrapper {open ? 'w-1/3' : 'w-0'}">
    <DrawerControls
        bind:currentView
        bind:open
        {selectedNodes}
    />

    {#if currentView === 0}
        <Ticker
            bind:nodes
            {selectNode}
            {parseTargets}
        />
    {:else if currentView === 1}
        <Timeline
            bind:updatesPaused
            {updateList}
            {parseTargets}
        />
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply h-full fixed right-0 bg-base-100 shadow-2xl transition-all overflow-y-scroll;
    }
    button {
        @apply transition-all;
    }
</style>

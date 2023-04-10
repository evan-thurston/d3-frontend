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

    export let nodes,
        selectedNodes,
        selectNode,
        updatesPaused,
        updateList,
        addNode,
        deleteNode;

    const parseTargets = (targets) => {
        let targetList = [];
        targets.forEach((target) => {
            if (typeof target === 'number') {
                let groupNodes = nodes.filter(({ group }) => group === target);
                groupNodes.forEach((node) => {
                    targetList.push(node.id);
                });
            } else if (target) {
                targetList.push(target);
            }
        });
        return targetList;
    };

    //currentView: 0 => tickerboard, 1 => timeline
    let open = false,
        currentView = 0;
</script>

<div class="wrapper {open ? 'open' : 'w-0'}">
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
            {addNode}
            {deleteNode}
        />
    {:else if currentView === 1}
        <Timeline
            bind:updatesPaused
            {updateList}
            {parseTargets}
        />
    {:else if currentView === 2}
        <p class="my-16 text-center">account information here (WIP)</p>
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply h-full fixed right-0 bg-base-100 shadow-2xl transition-all overflow-y-scroll;
    }
    .open {
        @apply w-2/3 xl:w-1/3;
    }
    button {
        @apply transition-all;
    }
</style>

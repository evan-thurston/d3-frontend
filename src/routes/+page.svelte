<script>
    import { onMount } from 'svelte';
    import PresetSelector from '$lib/selector/PresetSelector.svelte';
    import MainGraph from '$lib/main-graph/MainGraph.svelte';
    import ControlPanel from '$lib/controls/ControlPanel.svelte';
    import DataDrawer from '$lib/drawer/DataDrawer.svelte';

    //APPLICATION VARIABLES
    let width = 100,
        height = 100,
        loaded = false,
        simulationSelected = false,
        data = { nodes: [], links: [] },
        selectedNodes = [],
        physicsPaused = false,
        emitters = [],
        emitterIndex = 0,
        interval = 3000,
        progress = interval / 10,
        progressInterval,
        updateList = [],
        updatesPaused = true,
        grid = 0,
        restartSim = false;

    $: nodes = data.nodes.map((d) => Object.assign({}, d));
    $: links = data.links.map((d) => Object.assign({}, d));
    $: emitters = nodes.filter(({ out }) => out && out.length > 0);

    onMount(() => {
        loaded = true;
    });

    const sendPresetData = (presetData) => {
        data = presetData;
        updateLinks();
        simulationSelected = true;
    };

    const setNodes = (newNodes) => {
        nodes = newNodes;
    };

    const setLinks = (newLinks) => {
        links = newLinks;
    };

    const updateLinks = () => {
        data.links = [];
        data.nodes.forEach((node) => {
            if (node.out) {
                node.out.forEach((out) => {
                    if (typeof out === 'string') {
                        if (data.nodes.find(({ id }) => id === out)) {
                            data.links.push({
                                source: node.id,
                                target: out,
                            });
                        }
                    } else if (typeof out === 'number') {
                        let filteredNodes = data.nodes.filter(
                            ({ group }) => group === out
                        );
                        filteredNodes.forEach((nodeOut) => {
                            data.links.push({
                                source: node.id,
                                target: nodeOut.id,
                            });
                        });
                    }
                });
            }
        });
    };

    const selectNode = (nodeId) => {
        if (selectedNodes.includes(nodeId)) {
            selectedNodes = selectedNodes.filter((val) => val !== nodeId);
            nodes.find(({ id }) => id === nodeId).selected = false;
        } else {
            selectedNodes = [nodeId, ...selectedNodes];
            nodes.find(({ id }) => id === nodeId).selected = true;
            let nodeIndex = emitters.findIndex(({ id }) => id === nodeId);
            if (nodeIndex >= 0) {
                emitterIndex = nodeIndex;
            }
        }
        nodes = [...nodes];
    };

    const addNode = () => {
        let nodeId = 'new node ';
        let count = 1;

        while (nodes.find(({ id }) => id === nodeId + count)) {
            count++;
        }

        nodes = [...nodes, { id: nodeId + count, group: 0, out: [] }];

        restart();
    };

    const deleteNode = (nodeId) => {
        nodes = nodes.filter(({ id }) => id !== nodeId);

        restart();
    };

    const prog = () => {
        if (progress < interval) progress += interval / 10;
        else {
            updateList = [
                {
                    timestamp: new Date(),
                    id: emitters[emitterIndex].id,
                    group: emitters[emitterIndex].group,
                    targets: emitters[emitterIndex].out,
                },
                ...updateList,
            ];
            // console.log('updated', updateList);

            progress = interval / 10;
        }
    };

    const restart = () => {
        // console.log(nodes);
        // console.log(data.nodes);
        selectedNodes = [];
        physicsPaused = false;
        emitterIndex = 0;
        interval = 3000;
        progress = interval / 10;
        updateList = [];
        updatesPaused = true;
        grid = 0;

        data.nodes = nodes;
        updateLinks();

        restartSim = true;
    };

    $: {
        if (updatesPaused) clearInterval(progressInterval);
        else {
            clearInterval(progressInterval);
            progressInterval = setInterval(prog, interval / 10);
        }
    }
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
/>

{#if !loaded}
    <h1 class="loadingText">loading...</h1>
{:else if !simulationSelected}
    <PresetSelector {sendPresetData} />
{:else}
    <DataDrawer
        {nodes}
        {selectedNodes}
        {selectNode}
        bind:updatesPaused
        {updateList}
        {addNode}
        {deleteNode}
    />

    {#key restartSim}
        <MainGraph
            {width}
            {height}
            {nodes}
            {links}
            {setNodes}
            {setLinks}
            {selectNode}
            {physicsPaused}
            emitterId={emitters[emitterIndex].id}
            {interval}
            {updatesPaused}
            {grid}
            bind:restartSim
        />
    {/key}

    <ControlPanel
        bind:physicsPaused
        bind:emitterIndex
        {emitters}
        bind:simulationSelected
        bind:interval
        {updateList}
        bind:progress
        bind:updatesPaused
        bind:grid
        {restart}
    />
{/if}

<style lang="postcss">
    h1.loadingText {
        @apply text-3xl xl:text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2;
    }
</style>

<script>
    import NetworkGraph from "$lib/main-graph/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    import { onMount } from "svelte";

    import { lesMis, dummyNodes } from "$lib/utils";
    import DraggableControlPanel from "$lib/controls/DraggableControlPanel.svelte";
    import Ticker from "../lib/Ticker.svelte";

    let width = 1000,
        height = 1000,
        editorShowing = false,
        tickerShowing = false,
        physicsPaused,
        dataset = 1,
        group = 1,
        resetSim = false,
        loaded = false,
        newData = dummyNodes,
        paused = false,
        maxGroups = 1,
        groupLimit = false,
        grid = 1,
        content = {
            json: dummyNodes.nodes,
        };

    $: interval = 3000;
    $: gridInc = Math.round(width / 100);

    onMount(() => {
        loaded = true;
        let maxGroupNodes,
            i = 0;
        maxGroups = Math.max(...newData.nodes.map((o) => o.group));
        while (!groupLimit) {
            maxGroupNodes = newData.nodes.filter(
                ({ group }) => group === maxGroups - i
            );
            maxGroupNodes.forEach((obj) => {
                if (newData.links.find(({ source }) => obj.id === source))
                    groupLimit = obj.group;
            });
            i++;
        }
        if (group > groupLimit) group = groupLimit;
    });

    const toggle = () => {
        if (physicsPaused) {
            physicsPaused = false;
        } else {
            physicsPaused = true;
        }
    };
    const updateLinks = () => {
        newData.links = [];
        newData.nodes.forEach((node) => {
            if (node.out) {
                node.out.forEach((out) => {
                    if (typeof out === "string") {
                        if (newData.nodes.find(({ id }) => id === out)) {
                            newData.links.push({
                                source: node.id,
                                target: out,
                            });
                        }
                    } else if (typeof out === "number") {
                        let filteredNodes = newData.nodes.filter(
                            ({ group }) => group === out
                        );
                        filteredNodes.forEach((nodeOut) => {
                            newData.links.push({
                                source: node.id,
                                target: nodeOut.id,
                            });
                        });
                    }
                });
            }
        });
        content = { json: newData.nodes };
    };
    const jsonEdit = () => {
        editorShowing = !editorShowing;
        if(editorShowing) tickerShowing = false;
    };
    const toggleTicker = () => {
        tickerShowing = !tickerShowing;
        if(tickerShowing) editorShowing = false;
    };
    const reset = () => {
        updateLinks();
        resetSim = true;
        paused = false;
        editorShowing = false;
        let maxGroupNodes,
            i = 0;
        maxGroups = Math.max(...newData.nodes.map((o) => o.group));
        groupLimit = false;
        while (!groupLimit) {
            maxGroupNodes = newData.nodes.filter(
                ({ group }) => group === maxGroups - i
            );
            maxGroupNodes.forEach((obj) => {
                if (newData.links.find(({ source }) => obj.id === source))
                    groupLimit = obj.group;
            });
            i++;
        }
        if (group > groupLimit) group = groupLimit;
    };
    const resetTheSim = () => {
        resetSim = false;
    };
    const swapData = () => {
        if (dataset === 1) {
            dataset = 2;
            content = { json: lesMis.nodes };
        } else {
            dataset = 1;
            content = { json: dummyNodes.nodes };
        }
        updateData();
    };
    const pauseUpdates = (pause) => {
        paused = pause || !paused;
    };
    const updateData = () => {
        let newJson = content.json ? content.json : JSON.parse(content.text);
        // if (newData.nodes !== newJson) {
        newData = { nodes: newJson };
        reset();
        // }
    };
    const updateDataset = (data) => {
        content.json = data;
        // console.log(JSON.stringify(content.json))
        // updateData();
    };
    const deleteNode = (idToRemove) => {
        let filteredNodes = content.json.filter(({id}) => id !== idToRemove)
        if(filteredNodes && filteredNodes.length > 4) {
            newData = { nodes: filteredNodes };
            reset();
        }

        
    }
    const incInterval = () => {
        interval += 1000;
    };
    const decInterval = () => {
        interval -= 1000;
    };
    const incGroup = () => {
        group += 1;
    };
    const decGroup = () => {
        group -= 1;
    };
    const incGrid = () => {
        grid += gridInc;
        reset();
    };
    const decGrid = () => {
        grid -= gridInc;
        reset();
    };
    updateLinks();
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={reset}
/>

{#if editorShowing}
    <div class="fixed right-0 w-full md:w-1/3 2xl:w-1/4 h-screen">
        <JSONEditor bind:content navigationBar={false} />
    </div>
{/if}
{#if tickerShowing}
    <div class="fixed right-0 w-full md:w-1/3 2xl:w-1/4 h-screen overflow-y-scroll">
        <Ticker newData={content.json ? content.json : JSON.parse(content.text)} {deleteNode} />
    </div>
{/if}
{#if !loaded}
    <h1
        class="text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2"
    >
        loading...
    </h1>
{/if}
<div class:hidden={!loaded}>
    <NetworkGraph
        {resetSim}
        {resetTheSim}
        {physicsPaused}
        data={newData}
        {interval}
        {group}
        {paused}
        {grid}
        {updateDataset}
        {deleteNode}
    />
    <DraggableControlPanel
        {reset}
        {toggle}
        {jsonEdit}
        {toggleTicker}
        {swapData}
        {updateData}
        {interval}
        {incInterval}
        {decInterval}
        {group}
        {groupLimit}
        {incGroup}
        {decGroup}
        {paused}
        {pauseUpdates}
        {grid}
        {incGrid}
        {decGrid}
    />
</div>

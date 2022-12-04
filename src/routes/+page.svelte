<script>
    import ControlPanel from "$lib/ControlPanel.svelte";
    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    import { onMount } from "svelte";
    import Draggable from "../lib/Draggable.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    

    let width = 1000,
        height = 1000,
        editorShowing = false,
        physicsPaused,
        dataset = 1,
        group = 1,
        resetSim = false,
        loaded = false,
        newData = dummyNodes,
        paused = false,
        maxGroups = 1,
        treeMode = true,
        content = {
            json: dummyNodes.nodes,
        };

    $: interval = 3000;

    onMount(() => {
        loaded = true;
        maxGroups = Math.max(...newData.nodes.map((o) => o.group)) - 1;
    });

    // let JSONtext = JSON.stringify(content, null, 2);

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
                    if(newData.nodes.find(({ id }) => id === out)) {
                        newData.links.push({ 'source': node.id, 'target': out });
                    }
                });
            }
        });
        content = {json: newData.nodes}
    }
    const jsonEdit = () => {
        editorShowing = !editorShowing;
    };
    const reset = () => {
        updateLinks();
        resetSim = !resetSim;
        paused = false;
        editorShowing = false;
        maxGroups = Math.max(...newData.nodes.map((o) => o.group)) - 1;
        if (group > maxGroups) group = maxGroups;
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
        // JSONtext = JSON.stringify(content,null,2)
    };
    const pauseUpdates = (pause) => {
        paused = pause || !paused;
    };
    const updateData = () => {
        // newData = JSON.parse(JSONtext).json
        let newJson = content.json ? content.json : JSON.parse(content.text)
        console.log(content)
        newData = {'nodes': newJson};
        reset();
    };
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
    updateLinks();
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={reset}
/>

{#if editorShowing}
    <div class="fixed right-0 md:right-9 w-full md:w-1/3 2xl:w-1/4 h-screen">
        <JSONEditor bind:content onChangeMode={() => treeMode = !treeMode} />
        <!-- <textarea class='h-screen right-8 w-full' bind:value={JSONtext} /> -->
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
    {#key resetSim || dataset}
        <NetworkGraph
            {physicsPaused}
            {loaded}
            data={newData}
            {interval}
            {group}
            {paused}
            {pauseUpdates}
        />
    {/key}
    <Draggable>
        <ControlPanel
            {reset}
            {toggle}
            {jsonEdit}
            {swapData}
            {updateData}
            {interval}
            {incInterval}
            {decInterval}
            {group}
            {maxGroups}
            {incGroup}
            {decGroup}
            {paused}
            {pauseUpdates}
        />
    </Draggable>
</div>

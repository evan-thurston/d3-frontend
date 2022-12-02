<script>
    import ControlPanel from "$lib/ControlPanel.svelte";
    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    import { onMount } from "svelte";
    import Draggable from "../lib/Draggable.svelte";
    // import ForceWrapper from "./../lib/ForceWrapper.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    let width,
        height = 1000;
    let editorShowing = false;
    let physicsPaused;
    let dataset = 1;
    let resetSim = false;
    let loaded = false;
    let newData = dummyNodes;

    onMount(() => {
        loaded = true;
    })

    let content = {
        json: dummyNodes,
    };

    let JSONtext = JSON.stringify(content,null,2)

    const toggle = () => {
        if (physicsPaused) {
            physicsPaused = false;
        } else {
            physicsPaused = true;
        }
    };
    const jsonEdit = () => {
        editorShowing = !editorShowing;
    };
    const reset = () => {
        resetSim = !resetSim;
    };
    const swapData = () => {
        if (dataset === 1) {
            dataset = 2;
            content = { json: lesMis };
        } else {
            dataset = 1;
            content = { json: dummyNodes };
        }
        newData = content.json
        JSONtext = JSON.stringify(content,null,2)
    };

    const updateData = () => {
        // newData = JSON.parse(JSONtext).json
        newData = content.json;
        reset();
    }
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} on:resize={reset} />

{#if editorShowing}
    <div class="fixed right-0 md:right-9 w-full md:w-1/3 2xl:w-1/4 h-screen">
        <JSONEditor bind:content />
        <!-- <textarea class='h-screen right-8 w-full' bind:value={JSONtext} /> -->
    </div>
{/if}
{#if !loaded}
    <h1 class='text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2'>loading...</h1>
{/if}
<div class:hidden={!loaded}>
    {#key resetSim}
        {#if dataset === 1}
            <NetworkGraph data={newData} {physicsPaused} {loaded}/>
        {/if}
        {#if dataset === 2}
            <NetworkGraph data={newData} {physicsPaused} {loaded} />
            <!-- <ForceWrapper/> -->
        {/if}
    {/key}
    <Draggable>
        <ControlPanel {reset} {toggle} {jsonEdit} {swapData} {updateData} />
    </Draggable>
</div>
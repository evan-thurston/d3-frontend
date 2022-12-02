<script>
    import ControlPanel from "$lib/ControlPanel.svelte";
    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    import Draggable from "../lib/Draggable.svelte";
    // import ForceWrapper from "./../lib/ForceWrapper.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    let width,
        height = 1000;
    let editorShowing = false;
    let physicsPaused;
    let dataset = 1;
    let resetSim = false;

    let content = {
        json: dummyNodes,
    };

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
    };
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />
{#if editorShowing}
    <div class="fixed left-9 top-9 w-1/5 bottom-60">
        <JSONEditor bind:content />
    </div>
{/if}
{#key resetSim}
    {#if dataset === 1}
        <NetworkGraph data={dummyNodes} {physicsPaused} />
    {/if}
    {#if dataset === 2}
        <NetworkGraph data={lesMis} {physicsPaused} />
        <!-- <ForceWrapper/> -->
    {/if}
{/key}

<Draggable>
    <ControlPanel {reset} {toggle} {jsonEdit} {swapData} />
</Draggable>

<style lang="postcss">
    button {
        @apply mx-1;
    }
</style>

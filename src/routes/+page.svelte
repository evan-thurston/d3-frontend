<script>
    // @ts-nocheck

    import ControlPanel from "$lib/ControlPanel.svelte";
    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    // import ForceWrapper from "./../lib/ForceWrapper.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    let width,
        height = 1000;
    let editorShowing = false;
    let physicsPaused;
    let demo = 1;
    let resetSim = false;

    const toggle = () => {
        console.log(demo)
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
        if(demo === 1) demo = 2
        else demo = 1
    }

    let content = {
        text: undefined, // can be used to pass a stringified JSON document instead
        json: {
            array: [1, 2, 3],
            boolean: true,
            color: "#82b92c",
            null: null,
            number: 123,
            object: { a: "b", c: "d" },
            string: "Hello World",
        },
    };
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />
{#if editorShowing}
    <div class="fixed right-32 top-32">
        <JSONEditor bind:content />
    </div>
{/if}
{#key resetSim}
    {#if demo === 1}
        <NetworkGraph data={dummyNodes} {physicsPaused} />
    {/if}
    {#if demo === 2}
        <NetworkGraph data={lesMis} {physicsPaused} />
        <!-- <ForceWrapper/> -->
    {/if}
{/key}

<ControlPanel {reset} {toggle} {jsonEdit} {swapData}/>

<style lang="postcss">
    button {
        @apply mx-1;
    }
</style>

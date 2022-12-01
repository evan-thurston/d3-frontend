<script>
    // @ts-nocheck

    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor, setIn } from "svelte-jsoneditor";
    // import ForceWrapper from "./../lib/ForceWrapper.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    let width,
        height,
        interval = 1000;
    let editorShowing = false;
    let demo = 1;
    let physicsPaused;
    let resetSim = false;
    let updates = 0;
    let clear

    $: {
        clearInterval(clear)
        clear = setInterval(() => updates++, interval)
    }

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
    const slowDown = () => {
        interval += 1000
    };
    const speedUp = () => {
        interval -= 1000
    };
    const reset = () => {
        resetSim = !resetSim;
    };

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
<div class="h-8 absolute bottom-12 flex flex-row space-x-4 ml-8 items-center bg-violet-900 p-12 rounded-lg">
    <button on:click={reset} class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          
    </button>
    <button on:click={toggle} class="btn btn-primary">toggle physics</button>
    <button on:click={jsonEdit} class="btn btn-primary">JSON Editor</button> 
    <label>
        <input type="radio" bind:group={demo} value={1} />
        Dummy Dataset
    </label>
    <label>
        <input type="radio" bind:group={demo} value={2} />
        Les Mis Dataset
    </label>
    <button on:click={() => interval+=1000} class="btn btn-primary" class:btn-disabled={interval >= 10000}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
        </svg>
    </button>
    <button on:click={() => interval-=1000} class="btn btn-primary" class:btn-disabled={interval <= 1000}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
        </svg>
    </button>
    <span>
        Updates every {interval / 1000} second{interval > 1000 ? 's' : ''}
    </span>
    <span>
        Updates: {updates}
    </span>
</div>

<style lang="postcss">
    button {
        @apply mx-1;
    }
</style>

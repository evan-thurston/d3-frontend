<script>
    // @ts-nocheck

    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import { JSONEditor } from "svelte-jsoneditor";
    // import ForceWrapper from "./../lib/ForceWrapper.svelte";

    import { lesMis, dummyNodes } from "./../lib/utils";

    let width,
        height = 1000;
    let editorShowing = false;
    let demo = 1;
    let physicsPaused = false;

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
        return;
    };
    const speedUp = () => {
        return;
    };
    const stop = () => {
        return;
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
    <div class="fixed">
        <JSONEditor bind:content />
    </div>
{/if}
{#if demo === 1}
    <NetworkGraph data={dummyNodes} {physicsPaused} />
{/if}
{#if demo === 2}
    <NetworkGraph data={lesMis} {physicsPaused} />
    <!-- <ForceWrapper/> -->
{/if}
<div class="h-8 absolute bottom-12 flex flex-row space-x-4 ml-8 items-center">
    <button on:click={stop} class="btn btn-primary">
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
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    </button>
    <button on:click={slowDown} class="btn btn-primary">
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
    <button on:click={speedUp} class="btn btn-primary">
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
    <label>
        <input type="radio" bind:group={demo} value={1} />
        Dummy Dataset
    </label>
    <label>
        <input type="radio" bind:group={demo} value={2} />
        Les Mis Dataset
    </label>
    <button on:click={toggle} class="btn btn-primary">toggle physics</button>
    <button on:click={jsonEdit} class="btn btn-primary">JSON Editor</button>
</div>

<style lang="postcss">
    button {
        @apply mx-1;
    }
</style>

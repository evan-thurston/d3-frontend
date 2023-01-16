<script>
    import Ticker from "../Ticker.svelte";
    import { JSONEditor } from "svelte-jsoneditor";

    export let newData, deleteNode, content, updateData;

    //currentView: 0 => tickerboard, 1 => json editor, 2 => timeline
    let open = false,
        currentView = 0;
</script>

<div class="wrapper {open ? 'w-1/3' : 'w-0'}">
    <div class="controls">
        <button class="btn btn-primary" on:click={() => (open = !open)}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 transition-transform"
                class:rotate-180={open}
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
        <button
            class={open ? "btn btn-primary" : "btn btn-disabled btn-ghost"}
            on:click={() => (currentView = 0)}>DATA</button
        >
        <button
            class={open ? "btn btn-primary" : "btn btn-disabled btn-ghost"}
            on:click={() => (currentView = 1)}>EDIT</button
        >
        {#if open && currentView === 1}
            <button
                class={open ? "btn btn-primary" : "btn btn-disabled btn-ghost"}
                on:click={updateData}>SAVE</button
            >
        {/if}
    </div>
    {#if currentView === 0}
        <Ticker {newData} {deleteNode} />
    {:else if currentView === 1}
        <JSONEditor bind:content navigationBar={false} />
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply h-full fixed right-0 bg-base-100 shadow-2xl transition-all overflow-y-scroll;
    }
    .controls {
        @apply fixed -ml-24 mt-8 flex flex-col space-y-8;
    }
    button {
        @apply transition-all;
    }
</style>

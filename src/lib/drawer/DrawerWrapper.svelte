<script>
    import Ticker from "../Ticker.svelte";
    import DrawerModal from "./DrawerModal.svelte";
    // import { JSONEditor } from "svelte-jsoneditor";

    export let nodes, deleteNode, selectedNodes, selectNode, nodeSelected;

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
            class={!open || currentView !== 0
                ? "btn btn-primary"
                : "btn btn-disabled btn-ghost"}
            on:click={() => {
                if (!open) open = !open;
                currentView = 0;
            }}>DATA</button
        >
        <!-- {#if selectedNodes.length > 0}
            <button
                class={!open || currentView !== 1
                    ? "btn btn-primary"
                    : "btn btn-disabled btn-ghost"}
                on:click={() => {
                    if (!open) open = !open;
                    currentView = 1;
                }}>MODAL</button
            >
        {/if} -->
        <!-- <button
                class="btn btn-primary"
                on:click={() => {
                    if(window) window.location.href = '#A'
                }}>A</button
            >
            <button
                class="btn btn-primary"
                on:click={() => {
                    if(window) window.location.href = '#B'
                }}>B</button
            >
            <button
                class="btn btn-primary"
                on:click={() => {
                    if(window) window.location.href = '#C'
                }}>C</button
            > -->
        <!-- <button
            class={open ? "btn btn-primary" : "btn btn-disabled btn-ghost"}
            on:click={() => (currentView = 1)}>EDIT</button
        >
        {#if open && currentView === 1}
            <button
                class={open ? "btn btn-primary" : "btn btn-disabled btn-ghost"}
                on:click={updateData}>SAVE</button
            >
        {/if} -->
    </div>
    {#if currentView === 0 || selectedNodes.length === 0}
        <Ticker {nodes} {deleteNode} {selectedNodes} {selectNode} {nodeSelected}/>
    <!-- {:else if currentView === 1}
        {#key selectedNodes}
            {#each selectedNodes as nodeId}
                <div id={nodeId}>
                    <DrawerModal node={nodes.find(({ id }) => id === nodeId)} {selectNode}/>
                </div>
            {/each}
        {/key} -->
        <!-- <JSONEditor bind:content navigationBar={false} /> -->
    {/if}
</div>

<style lang="postcss">
    .wrapper {
        @apply h-full fixed right-0 bg-base-100 shadow-2xl transition-all overflow-y-scroll;
    }
    .controls {
        @apply fixed -ml-8 -translate-x-full mt-8 flex flex-col space-y-8 w-16;
    }
    button {
        @apply transition-all;
    }
</style>

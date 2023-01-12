<script>
    import Ticker from "../Ticker.svelte";

    export let newData, deleteNode, toggleTicker

    let open = false;
</script>

<!-- <button class="fixed top-0 right-0" on:click={() => (open = !open)}>
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
</button> -->

<div
    class="wrapper {open ? 'w-1/3' : 'w-0'} 
        "
>
    <button on:click={() => (open = !open)}>
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
    <Ticker {newData} {deleteNode}/>
</div>

<style lang="postcss">
    button {
        @apply fixed -ml-24 my-8 btn btn-primary;
    }

    h3 {
        @apply text-xl;
    }

    .wrapper {
        @apply h-full fixed right-0 bg-base-100 shadow-2xl transition-all;
    }
</style>

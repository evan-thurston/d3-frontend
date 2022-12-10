<script>
    export let label, value, inc, dec, incLimit, decLimit, incSvg, decSvg;
</script>

<div class="flex flex-row space-x-4">
    <div class="flex flex-col text-center w-fit">
        <span class="text-xs uppercase"> {label} </span>
        <span class="text-base font-bold">
            {value}
        </span>
    </div>
    <button on:click={dec} class:disabled={decLimit}>
        <img class="w-6 h-6 opacity-50" alt="increase grid size" src={decSvg} />
    </button>
    <button on:click={inc} class:disabled={incLimit}>
        <img class="w-6 h-6 opacity-50" alt="decrease grid size" src={incSvg} />
    </button>
</div>

<style lang="postcss">
    button {
        @apply btn btn-primary;
    }
    button.disabled {
        @apply btn-disabled;
    }
</style>

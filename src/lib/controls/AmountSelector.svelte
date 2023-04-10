<script>
    import FastForward from '$lib/icons/FastForward.svelte';
    import Minus from '$lib/icons/Minus.svelte';
    import Plus from '$lib/icons/Plus.svelte';
    import Rewind from '$lib/icons/Rewind.svelte';

    export let label,
        value,
        inc,
        dec,
        incLimit,
        decLimit,
        type = 'amount';
</script>

<main>
    {#if type === 'amount'}
        <button
            class="primaryButton"
            class:disabled={decLimit}
            on:click={dec}
        >
            <Minus />
        </button>
    {:else if type === 'speed'}
        <button
            class="primaryButton"
            class:disabled={decLimit}
            on:click={dec}
        >
            <Rewind />
        </button>
    {:else}
        selector type not supported
    {/if}
    <!-- SELECTOR INFO -->
    <div class="infoWrapper">
        <p class="infoLabel">{label}</p>
        <h5 class="infoValue">
            {value}
        </h5>
    </div>
    {#if type === 'amount'}
        <button
            class="primaryButton"
            class:disabled={incLimit}
            on:click={inc}
        >
            <Plus />
        </button>
    {:else if type === 'speed'}
        <button
            class="primaryButton"
            class:disabled={incLimit}
            on:click={inc}
        >
            <FastForward />
        </button>
    {:else}
        selector type not supported
    {/if}
</main>

<style lang="postcss">
    main {
        @apply flex flex-row space-x-4;
    }
    div.infoWrapper {
        @apply flex flex-col text-center w-fit my-auto;
    }
    p.infoLabel {
        @apply text-xs uppercase;
    }
    .infoValue {
        @apply font-bold leading-5;
    }
    button.disabled {
        @apply btn-disabled;
    }
</style>

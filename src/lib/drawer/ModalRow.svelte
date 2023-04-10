<script>
    export let field,
        value,
        id = false;
</script>

<main class:out={field === 'out'}>
    <p class:id>{field}:</p>
    {#if field === 'out'}
        <p>[{value || ''}]</p>
    {:else}
        <input
            class="w-full ml-8 borderInput"
            type="text"
            bind:value
            size={5}
            on:input={(e) => {
                if (field === 'group') {
                    value = /\d/.test(e.target.value)
                        ? Number(e.target.value)
                        : e.target.value;
                }
            }}
        />
    {/if}
</main>

<style lang="postcss">
    main {
        @apply text-lg py-2 flex flex-row justify-between items-center;
    }
    p.id {
        @apply text-2xl uppercase font-medium;
    }
</style>

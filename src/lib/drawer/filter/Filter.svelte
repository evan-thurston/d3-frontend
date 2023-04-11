<script>
    import FilterRow from './FilterRow.svelte';

    export let idList, groupList, outList;
</script>

<h6 class="mx-8 mt-4 uppercase">filter:</h6>
<div class="filter">
    <FilterRow
        name="emitter id"
        bind:arr={idList}
    />
    <FilterRow
        name="emitter group"
        bind:arr={groupList}
    />
    <FilterRow
        name="targets"
        bind:arr={outList}
    />
</div>

<style lang="postcss">
    .filter {
        @apply grid 2xl:grid-cols-3 gap-2 bg-base-200 border-2 border-base-300 p-4 mt-2 rounded-xl mx-4 2xl:mx-8;
    }
</style>

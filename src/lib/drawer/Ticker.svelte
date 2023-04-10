<script>
    import { scale, fade, slide } from 'svelte/transition';

    // import Highlight from '$lib/Highlight.svelte';
    // import DrawerModal from '$lib/drawer/DrawerModal.svelte';
    import Filter from './Filter.svelte';
    import TickerData from './TickerData.svelte';

    export let nodes, selectNode, parseTargets, addNode, deleteNode;

    // addNode,
    // deleteNode,
    // selectedNodes,

    let idList = [],
        groupList = [],
        outList = [],
        filteredIdList,
        filteredGroupList,
        filteredOutList;

    $: filteredIdList = idList.filter((val) => val !== '');
    $: filteredGroupList = groupList.filter((val) => val !== '');
    $: filteredOutList = outList.filter((val) => val !== '');
</script>

<main class="wrapper">
    <Filter
        bind:idList
        bind:groupList
        bind:outList
    />
    <div class="legend">
        <p>ID:</p>
        <p>group:</p>
        <p>out:</p>
        <p>x:</p>
        <p>y:</p>
        <p>delete</p>
    </div>
    <TickerData
        bind:nodes
        {filteredIdList}
        {filteredGroupList}
        {filteredOutList}
        {selectNode}
        {parseTargets}
        {addNode}
        {deleteNode}
    />
</main>

<style lang="postcss">
    .wrapper {
        @apply flex flex-col;
    }
    .legend {
        @apply xl:flex flex-row justify-around bg-base-200 border-2 border-base-300 p-4 mt-4 rounded-xl sticky top-4 mx-4 xl:mx-8 z-50 hidden;
    }
</style>

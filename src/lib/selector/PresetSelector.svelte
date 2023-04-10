<script>
    import {
        lesMis,
        dummyNodes,
        airports,
        fibonacci,
        themepark,
        blank,
    } from '$lib/utils';

    import PresetEditor from './PresetEditor.svelte';
    import PresetGrid from './PresetGrid.svelte';

    export let sendPresetData;

    let presetList = [
            lesMis,
            dummyNodes,
            airports,
            fibonacci,
            themepark,
            blank,
        ],
        presetNames = [
            'lesMis',
            'dummyNodes',
            'airports',
            'fibonacci',
            'themepark',
            'blank',
        ],
        presetName,
        presetData = {},
        presetSelected = false;

    const selectPreset = (id) => {
        presetSelected = true;
        presetData.nodes = presetList[id];
        presetName = presetNames[id];
    };

    const goBack = () => {
        presetSelected = false;
    };
</script>

{#if !presetSelected}
    <PresetGrid
        {presetNames}
        {presetList}
        {selectPreset}
    />
{:else}
    <PresetEditor
        {presetName}
        {presetData}
        {sendPresetData}
        {goBack}
    />
{/if}

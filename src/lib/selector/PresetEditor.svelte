<script>
    import Plus from '../icons/Plus.svelte';
    import Trashcan from '../icons/Trashcan.svelte';
    import OutEditor from './OutEditor.svelte';

    export let presetName, presetData, sendPresetData, goBack;
</script>

<main>
    <div class="controls">
        <button
            class="primaryButton"
            on:click={() => goBack()}
        >
            BACK
        </button>
        <div>
            <h5>preset:</h5>
            <h3 class="leading-5">
                {presetName}
            </h3>
        </div>
        <input
            class="primaryButton"
            type="submit"
            form="presetForm"
        />
    </div>
    <form
        id="presetForm"
        on:submit={() => sendPresetData(presetData)}
    >
        <!-- LEGEND BY COLUMN -->
        <div class="legend">
            <p class="col-span-2">id</p>
            <p>group</p>
            <p class="col-span-2">out</p>
        </div>
        <!-- LIST OF NODES -->
        {#each presetData.nodes as obj}
            <div class="editorRow">
                <button
                    class="deleteButton"
                    type="button"
                    on:click={() =>
                        (presetData.nodes = presetData.nodes.filter(
                            ({ id }) => id !== obj.id
                        ))}
                >
                    <Trashcan />
                </button>
                <!-- <div class="flex flex-row justify-between"> -->
                <input
                    class="mainInput"
                    type="text"
                    bind:value={obj.id}
                />
                <!-- </div> -->
                <input
                    class="mainInput"
                    type="text"
                    bind:value={obj.group}
                    on:input={(e) =>
                        (obj.group = /\d/.test(e.target.value)
                            ? Number(e.target.value)
                            : e.target.value)}
                />
                <div class="col-span-2">
                    <OutEditor bind:out={obj.out} />
                </div>
            </div>
        {/each}
        <!-- ADD A NODE -->
        <button
            on:click={() => (presetData.nodes = [...presetData.nodes, {}])}
            type="button"
            class="primaryButton"
        >
            <Plus />
        </button>
    </form>
</main>

<style lang="postcss">
    main {
        @apply flex flex-col space-y-4 xl:space-y-8 text-center h-full w-fit mx-auto px-8 lg:px-24 2xl:px-32 pb-0 pt-8 lg:pt-12 2xl:pt-16;
    }
    div.controls {
        @apply flex flex-row max-w-full justify-between uppercase;
    }
    form {
        @apply flex flex-col space-y-4 xl:space-y-8 mx-auto overflow-y-scroll pb-4 lg:pb-6 2xl:pb-8;
    }
    div.legend {
        @apply grid grid-cols-5 sticky top-0 bg-base-100 border-2 border-base-300 py-4 rounded-xl uppercase;
    }
    div.editorRow {
        @apply grid grid-cols-5 gap-2 xl:gap-4 bg-base-200 p-2 xl:p-8 rounded-xl;
    }
    button.deleteButton {
        @apply btn btn-primary h-full mr-2 xl:mr-4;
    }
    input.mainInput {
        @apply input input-bordered border-base-300 w-full h-full;
    }
</style>

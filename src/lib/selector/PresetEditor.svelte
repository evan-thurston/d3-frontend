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
            <h3>
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
            <p>id</p>
            <p>group</p>
            <p>out</p>
        </div>
        <!-- LIST OF NODES -->
        {#each presetData.nodes as obj}
            <div class="editorRow">
                <div class="flex flex-row justify-between">
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
                    <input
                        class="mainInput"
                        type="text"
                        bind:value={obj.id}
                    />
                </div>
                <input
                    class="mainInput"
                    type="text"
                    bind:value={obj.group}
                    on:input={(e) =>
                        (obj.group = /\d/.test(e.target.value)
                            ? Number(e.target.value)
                            : e.target.value)}
                />
                <OutEditor bind:out={obj.out} />
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
        @apply flex flex-col space-y-8 pt-32 pb-16 text-center h-full w-fit mx-auto;
    }

    div.controls {
        @apply flex flex-row max-w-full justify-between uppercase;
    }

    form {
        @apply flex flex-col space-y-8 mx-auto overflow-y-scroll px-8 pb-4;
    }
    div.legend {
        @apply flex flex-row space-x-4 justify-around sticky top-0 bg-base-100 border-2 border-base-300 py-4 rounded-xl uppercase;
    }
    div.editorRow {
        @apply grid grid-cols-3 gap-4 bg-base-200 p-8 rounded-xl;
    }
    button.deleteButton {
        @apply btn btn-primary h-full mr-4;
    }
    input.mainInput {
        @apply input input-bordered border-base-300 h-full;
    }
</style>

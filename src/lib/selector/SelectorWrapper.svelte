<script>
    import { lesMis, dummyNodes } from "$lib/utils";

    export let selectSimulation;

    let preset,
        presetData = [],
        presetSelected = false;

    const selectPreset = (id) => {
        presetSelected = true;
        preset = id;
        preset === 0 ? (presetData = dummyNodes) : (presetData = lesMis);
    };
</script>

{#if !presetSelected}
    <div class="grid grid-cols-2 p-32 gap-8 h-full">
        <button class="btn btn-primary h-full" on:click={() => selectPreset(0)}>
            <p class="my-16">Dummy Dataset</p>
        </button>
        <button class="btn btn-primary h-full" on:click={() => selectPreset(1)}>
            <p class="my-16">Les Mis Visualization</p>
        </button>
    </div>
{:else}
    <div
        class="flex flex-col space-y-8 pt-32 pb-16 text-center h-full overflow-y-scroll"
    >
        <h3 class="text-3xl">
            simulation {preset === 0 ? "dummyNodes" : "lesMis"}
        </h3>

        <form
            class="flex flex-col space-y-8 mx-auto"
            on:submit={() => {
                selectSimulation(presetData);
            }}
        >
            <input type="submit" />
            <div class="flex flex-row space-x-4 justify-around">
                <p>id</p>
                <p>group</p>
                <p>out</p>
            </div>
            {#each presetData.nodes as obj}
                <div class="flex flex-row space-x-4">
                    <input type="text" bind:value={obj.id} />
                    <input type="text" bind:value={obj.group} />
                    <div class="flex flex-col space-y-4 w-full">
                        {#if Array.isArray(obj.out)}
                            {#each obj.out as _, i}
                                <div class='flex flex-row space-x-4'>
                                    <input
                                        type="text"
                                        on:input={(e) =>
                                            (obj.out[i] = /\d/.test(
                                                e.target.value
                                            )
                                                ? Number(e.target.value)
                                                : e.target.value)}
                                        value={obj.out[i]}
                                    />
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        on:click={() => {obj.out = [...obj.out.filter((val) => val != obj.out[i])]; console.log(obj.out)}}
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            {/each}
                            <button
                                class="btn btn-primary"
                                type="button"
                                on:click={() => {
                                    obj.out = [...obj.out, ""];
                                    console.log(obj.out);
                                }}
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </button>
                        {:else}
                            <!-- <input type="text" bind:value={obj} /> -->

                            <button
                                class="btn btn-primary"
                                type="button"
                                on:click={() => {
                                    obj.out = [""];
                                    console.log(obj.out);
                                }}
                                ><svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </button>
                        {/if}
                    </div>
                </div>
            {/each}
        </form>
    </div>
{/if}

<style lang="postcss">
    input[type="text"] {
        @apply input input-primary;
    }
    input[type="submit"] {
        @apply btn btn-primary;
    }
</style>

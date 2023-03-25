<script>
    export let field,
        value,
        id = false;
</script>

<section class:id class:out={field === "out"}>
    <p>{field}:</p>
    {#if field === "out"}
        <p>[{value}]</p>
    {:else}
        <input
            type="text"
            bind:value
            size={5}
            on:input={(e) => {
                value = e.target.value;
                console.log("value", value);
                console.log("e.target", e.target.value);
            }}
        />
    {/if}
</section>

{#if field === "out"}
    <div class="flex flex-col space-y-4 w-full pb-2">
        {#if Array.isArray(value)}
            {#each value as _, i}
                <div class="flex flex-row space-x-4 justify-between">
                    <input
                        type="text"
                        on:input={(e) => {
                            value[i] = /\d/.test(e.target.value)
                                ? Number(e.target.value)
                                : e.target.value;
                            value = [...value];
                        }}
                        value={value[i]}
                        size={3}
                    />
                    <button
                        class="btn btn-primary"
                        type="button"
                        on:click={() => {
                            value = [...value.filter((val) => val != value[i])];
                            console.log(value);
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
                    value = [...value, ""];
                    console.log(value);
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
                    value = [""];
                    console.log(value);
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
{/if}

<style lang="postcss">
    section {
        @apply text-lg py-2 flex flex-row justify-between items-center;
    }
    section.id {
        @apply text-3xl uppercase font-medium;
    }
</style>
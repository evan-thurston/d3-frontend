<script>
    import { onMount } from "svelte";

    import { lesMis, dummyNodes } from "$lib/utils";

    import NetworkGraph from "$lib/main-graph/NetworkGraph.svelte";
    import DraggableControlPanel from "$lib/controls/DraggableControlPanel.svelte";
    import DrawerWrapper from "../lib/drawer/DrawerWrapper.svelte";

    let loaded = false,
        newData = dummyNodes,
        content = {
            json: dummyNodes.nodes,
        },
        physicsPaused = false,
        updatesPaused = true,
        group = 1,
        groupLimit = false,
        resetSim = false,
        grid = 1,
        simulationSelected = false,
        simulation = null,
        simulationData = [],
        optionsSelected = false;

    $: interval = 3000;
    $: gridInc = 30;

    onMount(() => {
        loaded = true;

        setGroupLimit();
    });

    const setGroupLimit = () => {
        let maxGroupNodes,
            maxGroups = Math.max(...newData.nodes.map((o) => o.group)),
            i = 0;
        while (!groupLimit) {
            maxGroupNodes = newData.nodes.filter(
                ({ group }) => group === maxGroups - i
            );
            maxGroupNodes.forEach((obj) => {
                if (newData.links.find(({ source }) => obj.id === source))
                    groupLimit = obj.group;
            });
            i++;
        }
        if (group > groupLimit) group = groupLimit;
    };

    const togglePhysics = () => {
        physicsPaused = !physicsPaused;
    };

    const updateLinks = () => {
        newData.links = [];
        newData.nodes.forEach((node) => {
            if (node.out) {
                node.out.forEach((out) => {
                    if (typeof out === "string") {
                        if (newData.nodes.find(({ id }) => id === out)) {
                            newData.links.push({
                                source: node.id,
                                target: out,
                            });
                        }
                    } else if (typeof out === "number") {
                        let filteredNodes = newData.nodes.filter(
                            ({ group }) => group === out
                        );
                        filteredNodes.forEach((nodeOut) => {
                            newData.links.push({
                                source: node.id,
                                target: nodeOut.id,
                            });
                        });
                    }
                });
            }
        });
    };

    const reset = () => {
        updateLinks();
        content = { json: newData.nodes };
        resetSim = true;
        updatesPaused = false;
        setGroupLimit();
    };

    const resetTheSim = () => {
        resetSim = false;
    };

    const pauseUpdates = (val) => {
        updatesPaused = val || !updatesPaused;
    };

    const updateData = () => {
        let newJson = content.json ? content.json : JSON.parse(content.text);
        // if (newData.nodes !== newJson) {
        newData = { nodes: newJson };
        reset();
        // }
    };

    const updateDataset = (data) => {
        content.json = data;
        // console.log(JSON.stringify(content.json))
        // updateData();
    };

    const deleteNode = (idToRemove) => {
        let filteredNodes = content.json.filter(({ id }) => id !== idToRemove);
        if (filteredNodes && filteredNodes.length > 4) {
            newData = { nodes: filteredNodes };
            reset();
        }
    };

    const incInterval = () => interval += 1000;

    const decInterval = () => interval -= 1000;

    const incGroup = () => group += 1;

    const decGroup = () => group -= 1;
    
    const incGrid = () => {
        grid += gridInc;
        reset();
    };

    const decGrid = () => {
        grid -= gridInc;
        reset();
    };

    updateLinks();

    const selectSimulation = (id) => {
        simulationSelected = true;
        simulation = id;
        simulation === 0
            ? (simulationData = dummyNodes)
            : (simulationData = lesMis);
        // content = { json: simulationData.nodes }
        // updateData();
    };
</script>

<svelte:window on:resize={reset} />

{#if !loaded}
    <h1 class="text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2">
        loading...
    </h1>
{:else if !simulationSelected}
    <div class="grid grid-cols-2 p-32 gap-8 h-full">
        <button
            class="btn btn-primary h-full"
            on:click={() => selectSimulation(0)}
        >
            <p class="my-16">Dummy Dataset</p>
        </button>
        <button
            class="btn btn-primary h-full"
            on:click={() => selectSimulation(1)}
        >
            <p class="my-16">Les Mis Visualization</p>
        </button>
    </div>
{:else if !optionsSelected}
    <div
        class="flex flex-col space-y-8 pt-32 pb-16 text-center h-full overflow-y-scroll"
    >
        <h3 class="text-3xl">
            simulation {simulation === "a" ? "dummyNodes" : "lesMis"}
        </h3>

        <form
            class="flex flex-col space-y-8 mx-auto"
            on:submit={() => {
                optionsSelected = true;
            }}
        >
            <input type="submit" />
            <div class="flex flex-row space-x-4 justify-around">
                <p>id</p>
                <p>group</p>
                <p>out</p>
            </div>
            {#each simulationData.nodes as obj}
                <div class="flex flex-row space-x-4">
                    <input type="text" value={obj.id} />
                    <input type="text" value={obj.group} />
                    <input type="text" value={obj.out} />
                </div>
            {/each}
        </form>
    </div>
{:else}
    <div class:hidden={!loaded}>
        <NetworkGraph
            {resetSim}
            {resetTheSim}
            {physicsPaused}
            data={newData}
            {interval}
            {group}
            {updatesPaused}
            {grid}
            {updateDataset}
            {deleteNode}
        />
        <DraggableControlPanel
            {reset}
            {togglePhysics}
            {physicsPaused}
            {interval}
            {incInterval}
            {decInterval}
            {group}
            {groupLimit}
            {incGroup}
            {decGroup}
            {updatesPaused}
            {pauseUpdates}
            {grid}
            {incGrid}
            {decGrid}
        />
        <DrawerWrapper
            newData={content.json ? content.json : JSON.parse(content.text)}
            {deleteNode}
            bind:content
            {updateData}
        />
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

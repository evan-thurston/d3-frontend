<script>
    import { onMount } from "svelte";
    import SelectorWrapper from "../lib/selector/SelectorWrapper.svelte";
    let loaded = false,
        simulationSelected = false;

    import { dummyNodes } from "$lib/utils";
    import NetworkGraph from "$lib/main-graph/NetworkGraph.svelte";
    let data = dummyNodes,
        selectedNodes = [];

    import ControlPanel from "$lib/controls/ControlPanel.svelte";
    import DrawerWrapper from "../lib/drawer/DrawerWrapper.svelte";
    let physicsPaused = false,
        updatesPaused = true,
        group = 1,
        groupLimit = false,
        resetSim = false,
        grid = 1,
        updateInterval,
        progressInterval,
        updates = 0,
        progress = 100,
        updateList = [],
        emitters = data.nodes.filter(({ out }) => Array.isArray(out)),
        nodeEmitting = emitters[0].id,
        nodeIndex = 0;

    $: links = data.links.map((d) => Object.assign({}, d));
    $: nodes = data.nodes.map((d) => Object.assign({}, d));

    $: interval = 3000;
    $: gridInc = 30;

    onMount(() => {
        loaded = true;

        setGroupLimit();
    });

    const reset = () => {
        updateLinks();
        resetSim = true;
        updatesPaused = false;
        setGroupLimit();
        selectedNodes = [];
        updateList = [];
        resetProg();
    };

    const resetTheSim = () => {
        resetSim = false;
    };

    const updateLinks = () => {
        data.links = [];
        data.nodes.forEach((node) => {
            if (node.out) {
                node.out.forEach((out) => {
                    if (typeof out === "string") {
                        if (data.nodes.find(({ id }) => id === out)) {
                            data.links.push({
                                source: node.id,
                                target: out,
                            });
                        }
                    } else if (typeof out === "number") {
                        let filteredNodes = data.nodes.filter(
                            ({ group }) => group === out
                        );
                        filteredNodes.forEach((nodeOut) => {
                            data.links.push({
                                source: node.id,
                                target: nodeOut.id,
                            });
                        });
                    }
                });
            }
        });
    };

    const setGroupLimit = () => {
        let maxGroupNodes,
            maxGroups = Math.max(...data.nodes.map((o) => o.group)),
            i = 0;
        while (!groupLimit) {
            maxGroupNodes = data.nodes.filter(
                ({ group }) => group === maxGroups - i
            );
            maxGroupNodes.forEach((obj) => {
                if (data.links.find(({ source }) => obj.id === source))
                    groupLimit = obj.group;
            });
            i++;
        }
        if (group > groupLimit) group = groupLimit;
    };

    const setNodes = (newNodes) => {
        nodes = newNodes;
    };

    const setLinks = (newLinks) => {
        links = newLinks;
    };

    const addNode = () => {
        console.log("adding node", data)
        data = { nodes: [...data.nodes, {"id": "id", "group": 0, "out": []}]}
        console.log("node added", data)
        reset();
    }

    const deleteNode = (idToRemove) => {
        let filteredNodes = data.nodes.filter(({ id }) => id !== idToRemove);
        if (filteredNodes && filteredNodes.length > 0) {
            data = { nodes: filteredNodes };
            reset();
        }
    };

    const toggleUpdates = (paused) => {
        updatesPaused = paused || !updatesPaused;
    };

    const togglePhysics = () => {
        physicsPaused = !physicsPaused;
    };

    const incGrid = () => {
        grid += gridInc;
        reset();
    };

    const decGrid = () => {
        grid -= gridInc;
        reset();
    };

    const incInterval = () => (interval += 1000);

    const decInterval = () => (interval -= 1000);

    const incGroup = () => (group += 1);

    const decGroup = () => (group -= 1);

    const nextNode = () => {
        nodeIndex++;
        nodeEmitting = emitters[nodeIndex].id;
    };

    const prevNode = () => {
        nodeIndex--;
        nodeEmitting = emitters[nodeIndex].id;
    };

    const selectNode = (nodeId) => {
        if (selectedNodes.includes(nodeId)) {
            selectedNodes = selectedNodes.filter((val) => val !== nodeId);
        } else {
            selectedNodes = [nodeId, ...selectedNodes];
            let emitterIndex = emitters.findIndex(({ id }) => id === nodeId);
            if (emitterIndex >= 0) {
                nodeEmitting = nodeId;
                nodeIndex = emitterIndex;
            }
        }
    };

    const nodeSelected = (id) => {
        return selectedNodes.find((val) => val === id);
    };

    const selectSimulation = (simulationData) => {
        data = simulationData;
        emitters = data.nodes.filter(({ out }) => Array.isArray(out));
        nodeIndex = 0;
        nodeEmitting = emitters[nodeIndex].id;
        updateLinks();
        selectedNodes = [];
        updateList = [];
        simulationSelected = true;
    };

    const newPreset = () => {
        simulationSelected = false;
    };

    updateLinks();

    const update = () => {
        updates++;

        updateList = [{"timestamp": new Date(), "emitter": nodeEmitting, "emitterGroup": emitters[nodeIndex].group, "targets": emitters[nodeIndex].out}, ...updateList];
    };

    const prog = () => {
        if (progress < interval) progress += interval / 10;
        else progress = interval / 10;
    };

    const resetProg = () => {
        updates = 0;
        clearInterval(updateInterval);
        updateInterval = setInterval(update, interval);
        clearInterval(progressInterval);
        progressInterval = setInterval(prog, interval / 10);
    };

    $: {
        if (updatesPaused) {
            clearInterval(updateInterval);
        } else {
            clearInterval(updateInterval);
            updateInterval = setInterval(update, interval);
            progress = interval / 10;
        }
    }
    $: {
        if (updatesPaused) {
            clearInterval(progressInterval);
            progress = interval / 10;
        } else {
            clearInterval(progressInterval);
            progressInterval = setInterval(prog, interval / 10);
        }
    }
</script>

<svelte:window on:resize={reset} />

{#if !loaded}
    <h1
        class="text-7xl top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2"
    >
        loading...
    </h1>
{:else if !simulationSelected}
    <SelectorWrapper
        {simulationSelected}
        {setNodes}
        {reset}
        {selectSimulation}
    />
{:else}
    <div class:hidden={!loaded}>
        <NetworkGraph
            {resetSim}
            {resetTheSim}
            {physicsPaused}
            {data}
            {interval}
            {group}
            {updatesPaused}
            {grid}
            {deleteNode}
            {nodes}
            {links}
            {setNodes}
            {setLinks}
            {selectedNodes}
            {selectNode}
            {nodeSelected}
            {nodeEmitting}
        />
        <ControlPanel
            {reset}
            {resetProg}
            {togglePhysics}
            {physicsPaused}
            {interval}
            {incInterval}
            {decInterval}
            {group}
            {incGroup}
            {decGroup}
            {updatesPaused}
            {groupLimit}
            {toggleUpdates}
            {grid}
            {incGrid}
            {decGrid}
            {updates}
            {progress}
            {newPreset}
            {nodeEmitting}
            {nodeIndex}
            {nextNode}
            {prevNode}
            nodeCount={emitters.length}
        />
        <DrawerWrapper
            {nodes}
            {addNode}
            {deleteNode}
            {selectedNodes}
            {selectNode}
            {nodeSelected}
            {updateList}
        />
    </div>
{/if}

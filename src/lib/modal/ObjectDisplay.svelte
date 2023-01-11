<script>
    import { onMount } from "svelte";
    import Highlight from "../Highlight.svelte";

    export let point,
        color,
        targeted,
        fields = null;

    let objectArr = [],
        keys = Object.keys(point),
        ignoredKeys = new Set(["vx", "vy", "fx", "fy"]),
        coords = new Set(["x", "y"]);

    if (!fields) {
        fields = keys;
        fields.push("targeted", "color", "icon");
    }

    onMount(() => {
        // fields = new Set(fields)
        // console.log(fields);
    });

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "data" && fields.includes("targeted")) {
            objectArr.push({ label: "targeted", value: targeted || false });
        }
        if (fields.includes(keys[i]) && !ignoredKeys.has(keys[i]))
            objectArr.push({
                label: keys[i],
                value: coords.has(keys[i])
                    ? Math.round(point[keys[i]])
                    : point[keys[i]],
            });
        if (keys[i] === "group") {
            if (fields.includes("color"))
                objectArr.push({ label: "color", value: color });

            if (fields.includes("icon")) {
                objectArr.push({
                    label: "icon",
                    value: point.group > 2 ? "dog" : "bird",
                });
            }
        }
    }
    if (!objectArr.find(({ label }) => label === "targeted")) {
        objectArr.push({ label: "targeted", value: targeted || false });
    }

    if (!fields) fields = keys;
</script>

<div class="ml-4">
    {#each objectArr as field}
        <p
            class={field.label === "id"
                ? "text-lg uppercase font-medium"
                : "text-sm"}
        >
            {field.label}:
            <Highlight value={field.value}>
                {typeof field.value === "object" ? "[" : ""}
                {field.label === "data" ? "" : field.value}
                {typeof field.value === "object" ? "]" : ""}
            </Highlight>
        </p>

        {#if field.label === "data"}
            <div class="ml-4">
                {#each field.value as obj}
                    <p class="text-sm">
                        {obj.label}:
                        <Highlight value={obj.value}>
                            {obj.value}
                        </Highlight>
                    </p>
                {/each}
            </div>
        {/if}
    {/each}
</div>

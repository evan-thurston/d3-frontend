<script>
    import { onMount } from "svelte";

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
            <span
                style={field.label === "color" ? "color: " + field.value : ""}
                class={typeof field.value === "string"
                    ? "text-success"
                    : typeof field.value === "number"
                    ? "text-warning"
                    : typeof field.value === "object"
                    ? "text-info"
                    : "text-error"}
            >
                {typeof field.value === "object" ? "[" : ""}
                {field.label === "data" ? "" : field.value}
                {typeof field.value === "object" ? "]" : ""}
            </span>
        </p>
        {#if field.label === "data"}
            <div class="ml-4">
                {#each field.value as obj}
                    <p class="text-sm">
                        {obj.label}:
                        <span
                            class={typeof obj.value === "string"
                                ? "text-success"
                                : typeof obj.value === "number"
                                ? "text-warning"
                                : typeof obj.value === "object"
                                ? "text-info"
                                : "text-error"}
                            >{obj.value}
                        </span>
                    </p>
                {/each}
            </div>
        {/if}
    {/each}
</div>

<script>
    export let point, color, targeted;

    let objectArr = [],
        keys = Object.keys(Object.getPrototypeOf(point));

    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "data") {
            objectArr.push({ label: "targeted", value: targeted || false });
        }
        objectArr.push({ label: keys[i], value: point[keys[i]] });
        if (keys[i] === "group") {
            objectArr.push({ label: "color", value: color });

            objectArr.push({
                label: "icon",
                value: point.group > 2 ? "dog" : "bird",
            });
        }
    }
    if (!objectArr.find(({ label }) => label === "targeted")) {
        objectArr.push({ label: "targeted", value: targeted || false });
    }
    // targeted: {targeted || false}

    // console.log(Object.getPrototypeOf(point));
    console.log(objectArr);
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
            {typeof field.value === 'object' ? "[" : ""}
                {field.label === "data" ? "" : field.value}
            {typeof field.value === 'object' ? "]" : ""}

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

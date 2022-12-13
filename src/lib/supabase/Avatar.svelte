<script>
    import { createEventDispatcher } from "svelte";
    import { supabase } from "$lib/supabaseClient";

    export let size = 10;
    export let url;

    let avatarUrl = null;
    let uploading = false;
    let files;

    const dispatch = createEventDispatcher();

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);

            if (error) {
                throw error;
            }

            const urlObject = URL.createObjectURL(data);
            avatarUrl = urlObject;
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error downloading image: ", error.message);
            }
        }
    };

    const uploadAvatar = async () => {
        try {
            uploading = true;

            if (!files || files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${Math.random()}.${fileExt}`;

            let { error } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            url = filePath;
            dispatch("upload");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            uploading = false;
        }
    };

    $: if (url) downloadImage(url);
</script>

<p>Avatar:</p>
<div class="flex flex-row space-x-4 items-center mb-4">

    <div class="rounded-full p-2 bg-base-300">
        {#if avatarUrl}
            <img
                src={avatarUrl}
                alt={avatarUrl ? "Avatar" : "No image"}
                class="rounded-full"
                style="height: {size}em; width: {size}em;"
            />
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                style="height: {size}em; width: {size}em;"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
            </svg>
        {/if}
    </div>

    <div>
        <label class="btn btn-primary" for="upload">
            {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
            style="visibility: hidden; position:absolute;"
            type="file"
            id="upload"
            accept="image/*"
            bind:files
            on:change={uploadAvatar}
            disabled={uploading}
        />
    </div>
</div>

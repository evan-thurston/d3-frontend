<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { supabase } from "$lib/supabaseClient";

    const session = $page.data.session;

    let loading = false;
    let username = null;
    let url = null;
    let avatarUrl = null;
    let avatarSize = 2;

    onMount(() => {
        if (session) getProfile();
    });

    const getProfile = async () => {
        try {
            loading = true;
            const { user } = session;

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`username, avatar_url`)
                .eq("id", user.id)
                .single();

            if (data) {
                username = data.username;
                url = data.avatar_url;
            }

            if (error && status !== 406) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };

    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage
                .from("avatars")
                .download(path);

            if (error) {
                throw error;
            }

            const url = URL.createObjectURL(data);
            avatarUrl = url;
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error downloading image: ", error.message);
            }
        }
    };

    async function signOut() {
        try {
            loading = true;
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
            avatarUrl = null;
        }
    }

    $: if (url) downloadImage(url);
</script>

<nav>
    <div>
        <a class="text-xl" href="./">d3 frontend</a>
    </div>

    <div>
        {#if !$page.data.session}
            <a href="./auth">
                <button disabled={loading}>Sign In</button>
            </a>
        {:else}
            <span>logged in as: </span>
            <a class="btn btn-primary space-x-4" href="./auth">
                <p>{username ? username : session.user.email}</p>
                <div class="rounded-full p-1 bg-base-300">
                    {#if avatarUrl}
                        <img
                            src={avatarUrl}
                            alt={avatarUrl ? "Avatar" : "No image"}
                            class="rounded-full"
                            style="height: {avatarSize}em; width: {avatarSize}em;"
                        />
                    {:else}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            style="height: 2em; width: 2em;"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                        </svg>
                    {/if}
                </div>
            </a>
            {#if $page.url.pathname !== "/auth"}
                <button on:click={signOut} disabled={loading}>Sign Out</button>
            {/if}
        {/if}
    </div>
</nav>

<style lang="postcss">
    nav {
        @apply fixed bg-base-300 h-12 w-full top-0 px-8 py-8 flex flex-row items-center justify-between;
    }
    button {
        @apply btn btn-primary;
    }
</style>

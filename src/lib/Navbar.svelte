<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { supabase } from "$lib/supabaseClient";

    export let inDarkMode, switchTheme;

    const session = $page.data.session;

    let loading = false,
        username = null,
        url = null,
        avatarUrl = null,
        avatarSize = 2,
        email,
        emailSent = false;

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

            const urlObject = URL.createObjectURL(data);
            avatarUrl = urlObject;
        } catch (error) {
            if (error instanceof Error) {
                console.log("Error downloading image: ", error.message);
            }
        }
    };

    const signIn = async () => {
        try {
            loading = true;
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            emailSent = true;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };

    $: if (url) downloadImage(url);
</script>

<nav>
    <!-- <div class="flex flex-row space-x-4">
        <button on:click={switchTheme}>
            {#if inDarkMode}
                <svg
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
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                    />
                </svg>
            {:else}
                <svg
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
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                </svg>
            {/if}
        </button>
        <a class="btn btn-primary" href="./"
            >d3<span class="hidden md:inline-block">&nbsp;frontend</span></a
        >
    </div> -->

    {#if !session}
        <form on:submit|preventDefault={signIn}>
            {#if !emailSent}
                <div>
                    <input
                        type="email"
                        placeholder="Your email"
                        bind:value={email}
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value={loading ? "Loading" : "Sign In"}
                        disabled={loading}
                    />
                </div>
            {:else}
                <div class="btn btn-disabled">
                    check your email for a link to sign in
                </div>
                <button on:click={() => (emailSent = false)}>try again</button>
            {/if}
        </form>
    {:else}
        <a class="btn btn-primary space-x-4" href="./account">
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
    {/if}
</nav>

<style lang="postcss">
    nav {
        @apply fixed w-full top-0 p-8 flex flex-row items-center justify-between;
    }
    button {
        @apply btn btn-primary;
    }
    form {
        @apply flex flex-row space-x-4;
    }
    input[type="email"] {
        @apply input input-bordered input-primary w-full max-w-xs;
    }
    input[type="submit"] {
        @apply btn btn-primary;
    }
</style>

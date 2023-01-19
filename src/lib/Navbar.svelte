<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { supabase } from "$lib/supabaseClient";

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
    <a
        class="btn btn-primary"
        href='/'
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
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
        </svg>
    </a>
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
        @apply fixed w-full top-0 h-28 px-8 flex flex-row items-center space-x-4;
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

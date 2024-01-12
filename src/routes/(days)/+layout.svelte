<script lang="ts">
    import Enumerable from 'linq'
    import { page } from '$app/stores';
    import { goto } from '$app/navigation'
    import { writable } from 'svelte/store'

    import type { LayoutServerData } from './$types'
    import type { NavigationLink } from '$lib/components/@types';

    export let data: LayoutServerData

    $: ({ pageTitle, navLink } = data)

    function getNavLinks() {
        const { subscribe, update } = writable<{prev?: NavigationLink, next?: NavigationLink }>({})

        return {
            subscribe,
            update,
        }
    }

    const navLinkStore = getNavLinks()
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<div class="container-fluid my-4">
    <div class="container-fluid sticky-top d-block bg-white pb-2 px-0">
        <h1 class="mb-5 mt-3 text-center" id={pageTitle?.split(' ').join('')}>{pageTitle}</h1>
        
        <div class="my-3">
            <button class="btn btn-primary" on:click={async () => await goto($page.url.origin)}>Get back</button>
        </div>
    </div>
    
    <slot />
</div>
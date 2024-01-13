<script lang="ts">
    import Enumerable from 'linq'
    import { page } from '$app/stores';

    import type { LayoutServerData } from './$types'
    import type { NavigationLink } from '$lib/components/@types';

    export let data: LayoutServerData

    $: ({ pageTitle, navLink } = data)

    $: paginateNavlink = {} as { prev?: NavigationLink, next?: NavigationLink }
    $: indexNavlink = Enumerable.from(navLink).indexOf(a => `/${a.url}` === $page.url.pathname)
    
    $: if (indexNavlink === 0) {
        paginateNavlink.next = navLink[indexNavlink + 1]
        paginateNavlink.prev = undefined
    } else if (indexNavlink + 1 === navLink.length) {
        paginateNavlink.next = undefined
        paginateNavlink.prev = navLink[indexNavlink - 1]
    } else {
        paginateNavlink.next = navLink[indexNavlink + 1]
        paginateNavlink.prev = navLink[indexNavlink - 1]
    }
</script>

<svelte:head>
    <title>{pageTitle}</title>
</svelte:head>

<div class="container-fluid mb-4">
    <div class="container-fluid sticky-top d-block bg-white pb-2 px-0">
        <nav class="navbar mb-3">
            <div class="container-fluid">
                <h4 class="text-center" id={pageTitle?.split(' ').join('')}>{pageTitle}</h4>

                <div class="d-flex justify-content-center align-items-center">
                    <a target="_blank"
                        href="https://github.com/kevinap29/advent-svelte" 
                        class="badge rounded-pill text-bg-dark link-underline link-underline-opacity-0"
                        >Github</a>
                </div>
            </div>
        </nav>
        
        <div class="my-3 clearfix">
            <!-- <button class="btn btn-primary" on:click={async () => await goto($page.url.origin)}>Get back</button> -->
            {#if paginateNavlink.prev}
                <a href={`${$page.url.origin}/${paginateNavlink.prev.url}`} class="btn btn-sm btn-primary text-white float-start">Prev: {paginateNavlink.prev.title}</a>
            {/if}
            {#if paginateNavlink.next}
                <a href={`${$page.url.origin}/${paginateNavlink.next.url}`} class="btn btn-sm btn-primary text-white float-end">Next: {paginateNavlink.next.title}</a>
            {/if}
        </div>
    </div>
    
    <slot />
</div>
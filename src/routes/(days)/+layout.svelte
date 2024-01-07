<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation'

    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData

    $: ({ pageTitle } = data)
    $: title = $page.url.searchParams.get('title')
    
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
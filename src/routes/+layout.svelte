<script lang="ts">
    import { page } from '$app/stores'
    import Nav from '$lib/components/Nav.svelte';
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData

    $: ({ navlink } = data)
    $: webTitleIsHover = false
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-3">
            <div class="container-fluid mb-3 sticky-top">
                <h3 class="text-center py-4 border-bottom border-1 display-6" on:mouseenter={() => webTitleIsHover = true} on:mouseleave={() => webTitleIsHover = false}>
                    <a href="https://advent.sveltesociety.dev/" class="text-dark link-underline-dark {webTitleIsHover ? 'link-underline-opacity-100' : 'link-underline-opacity-0'}">Advent of Svelte</a>
                </h3>
                
                <Nav listNavLinks={navlink} url={$page.url} />
            </div>
        </div>
        <div class="col-9">
            <div class="container-fluid">
                <slot />
            </div>
        </div>
    </div>
</div>
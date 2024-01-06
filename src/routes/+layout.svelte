<script lang="ts">
    import { page } from '$app/stores'
    import Nav from '$lib/components/Nav.svelte';
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData

    $: ({ navlink } = data)
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-3">
            <div class="container-fluid mb-3 sticky-top">
                <h3 class="text-center py-4 border-bottom border-1 display-6">Advent of Svelte</h3>
                
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
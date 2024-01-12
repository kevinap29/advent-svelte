<script lang="ts">
    import Enumerable from 'linq';
    import { onMount } from 'svelte';
    import { santaDeckStore, santaDeckGameHandlerStore } from './utils'
    import { delay } from '$lib';
    // import type { PageServerData } from './$types'; 
    
    // export let data: PageServerData;
    
    $: gameTime = 0

    async function handleBtnStart() {
        santaDeckGameHandlerStore.startGame()
        santaDeckGameHandlerStore.subscribe(store => {
            store.time.subscribe(t => {
                if (t > 0) gameTime = t
            })
        })
    }

    async function handleCardOpen(id: number, index: number) {
        if ($santaDeckGameHandlerStore.playerPick.id < 1) {
            santaDeckGameHandlerStore.setPick(id, index)
            santaDeckStore.openWhereIndex(index)
            
            return
        }
        
        if ($santaDeckGameHandlerStore.playerPick.id === id) {
            santaDeckStore.openWhereIndex(index)
            santaDeckGameHandlerStore.resetPick()


            santaDeckGameHandlerStore.setWinning()

            return
        }

        santaDeckStore.openWhereIndex(index)
        
        await delay(500)

        santaDeckStore.closeWhereId($santaDeckGameHandlerStore.playerPick.id)
        santaDeckStore.closeWhereId(id)
        santaDeckGameHandlerStore.resetPick()
    }

    onMount(() => {
       const range = Enumerable.range(1, 24).toArray()

       for (const index of range) {
            const url: string = `https://advent.sveltesociety.dev/data/2023/day-eight/${index}.png`
            const placeholder: string = `data:image/png;base64,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`

            santaDeckStore.update(store => {
                store.push({ id: index, url: url, placeholder: placeholder, state: 'close' })
                store.push({ id: index, url: url, placeholder: placeholder, state: 'close' })

                return store
            })
       }

        santaDeckStore.shuffle()

        return () => {
            $santaDeckGameHandlerStore.time.subscribe(t => {
                gameTime = t
            })
        }
    })
</script>


<div class="container-fluid">
    <div class="row">
        {#if gameTime > 0}
        <div class="text-center">
            <h1>Time: </h1>
            <p class="display-6">{gameTime}</p>
        </div>
        {/if}
        <div class="d-flex justify-content-evenly align-items-center">
            <button class="btn btn-primary text-white" disabled={gameTime > 0} on:click={e => handleBtnStart()}>start</button>

            <button class="btn btn-warning text-dark" on:click={e => santaDeckGameHandlerStore.resetGame()}>reset</button>

            <button class="btn btn-danger text-white" disabled={gameTime > 0 && $santaDeckGameHandlerStore.activeCheat} on:click={e => santaDeckGameHandlerStore.activeCheat()}>cheat</button>
        </div>
    </div>

    {#if gameTime > 0}
        {#each $santaDeckStore as image, index}
            {#if image.state === 'close'}
            <button class="btn position-relative" on:click={() => handleCardOpen(image.id, index)}>
                {#if $santaDeckGameHandlerStore.activeCheat}
                <span class="position-absolute top-0 start-50 translate-middle-x bg-dark text-white" style="width: 30px;">{image.id}</span>
                {/if}
                <img src="{image.placeholder}" alt="{`Card id: ${image.id}`}" class="p-2 img-thumbnail">
            </button>
            {:else}
            <img src="{image.url}" alt="{`Card id: ${image.id}`}" class="p-2 img-thumbnail">
            {/if}
        {/each}
    {/if}
</div>
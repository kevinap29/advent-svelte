<script lang="ts">
    import Accordion from '$lib/components/Accordion.svelte';
    import { christmasCountdownStore } from './utils'
    import { onMount } from 'svelte';
    import type { PageServerData } from './$types';
    
    export let data: PageServerData;

    $: countDownDateTime = new Date()
    $: nextChristmas = new Date()

    async function testTodayIsChristmas() {
        countDownDateTime = new Date(new Date().getFullYear(), $christmasCountdownStore.month - 1, $christmasCountdownStore.date, 1,0,0)
        nextChristmas = new Date(new Date().getFullYear(), $christmasCountdownStore.month - 1, $christmasCountdownStore.date, 0,0,0)
    
        if (countDownDateTime.getTime() > nextChristmas.getTime()) {
            nextChristmas = new Date(new Date().getFullYear() + 1, $christmasCountdownStore.month - 1, $christmasCountdownStore.date, 0, 0, 0)
        }
    }

    onMount(() => {
        $christmasCountdownStore.countdown.subscribe(t => {
            countDownDateTime = new Date(t)
            
            nextChristmas = new Date(new Date().getFullYear(), $christmasCountdownStore.month - 1, $christmasCountdownStore.date, 0,0,0)
    
            if (countDownDateTime.getTime() > nextChristmas.getTime()) {
                nextChristmas = new Date(new Date().getFullYear() + 1, $christmasCountdownStore.month - 1, $christmasCountdownStore.date, 0, 0, 0)
            }
        })

        // testTodayIsChristmas()
    })
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            As Christmas Eve rapidly approaches, the North Pole is abuzz with excitement and festive preparations. However, Svelte Bot has realized that amidst all the hustle and bustle, they've lost track of the exact countdown to the big night. The old, trusty mechanical countdown clock, a centerpiece in Santa's workshop for decades, has finally ticked its last tock. With everyone so busy making toys and preparing the sleigh, we need this vital tool to keep everyone aligned and on schedule.
        </p>
        <p>
            Your mission is to create a modern digital solution that accurately counts down to the stroke of midnight on Christmas Eve. This countdown timer should be visually festive and engaging, displaying the remaining days, hours, minutes, and seconds in a way that adds to the holiday spirit. Santa and the elves are counting on you to bring this crucial piece of Christmas technology to life, ensuring that the magic of Christmas Eve unfolds perfectly on time.
        </p>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="text-center">
            <div class="row mb-5">
                <h1>Countdown</h1>
                <p class="display-6">{countDownDateTime}</p>
            </div>
            <div class="row my-5">
                <h1>Next Christmas</h1>
                <p class="display-6">{nextChristmas}</p>
            </div>
        </div>

        {#if countDownDateTime.getDate() === $christmasCountdownStore.date && countDownDateTime.getMonth() + 1 === $christmasCountdownStore.month}
            <div class="text-center my-5">
                <p class="display-5">Merry Christmas</p>
            </div>
        {/if}
    </Accordion>
</div>
<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { fade, slide } from 'svelte/transition'
    import { cookiesCounterStore } from './utils'

    const aggregator: number = 2

    async function addCounter() {
        if ($cookiesCounterStore < 100) {
            cookiesCounterStore.update(count => count + aggregator)
        }
    }
    async function removeCounter() {
        if ($cookiesCounterStore > 0) {
            cookiesCounterStore.update(count => count - aggregator)
        }
    }
    async function resetCounter() {
        cookiesCounterStore.update(count => count - count)
    }
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            As the clock ticks down to Christmas Eve, Santa is preparing to eat all the cookies left by children all over the world. But amidst the holiday cheer, a small problem has arisen - how can we keep track of how many cookies Santa has munched!
        </p>

        <p>
            You've been tasked with creating a Cookie Counter which can show the tally of cookies munched. We should also be able to add, remove, and reset the count. Svelte Bot, in it's wisdom, recommends exploring the dynamic world of Svelte transitions/animations to level up your creation.
        </p>

        <p>
            If you're up for it, you could consider adding a feature that shows Santa's mood based on the number of cookies eaten - maybe he gets a little merrier with each cookie!
        </p>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <p>Santa Mood</p>

        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow={$cookiesCounterStore} aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: {$cookiesCounterStore}%">
                {#if $cookiesCounterStore >= 10 && $cookiesCounterStore < 20}
                    <div in:slide={{ axis: 'x', duration: 200 }} out:fade={{ duration: 200 }}>Sluuurrrrpppp ....</div>
                {/if}
                {#if $cookiesCounterStore >= 20 && $cookiesCounterStore < 40}
                    <div in:slide={{ axis: 'x', duration: 200 }} out:fade={{ duration: 200 }}>More more ...</div>
                {/if}
                {#if $cookiesCounterStore >= 40 && $cookiesCounterStore < 60}
                    <div in:slide={{ axis: 'x', duration: 200 }} out:fade={{ duration: 200 }}>I hope you remain a bad boy, Ho Ho Ho</div>
                {/if}
                {#if $cookiesCounterStore >= 60 && $cookiesCounterStore < 100}
                    <div in:slide={{ axis: 'x', duration: 200 }} out:fade={{ duration: 200 }}>Ho Ho Ho, It's all mine</div>
                {/if}
                {#if $cookiesCounterStore === 100}
                    <div in:slide={{ axis: 'x', duration: 200 }} out:fade={{ duration: 200 }}>Ho Ho Ho, I'm full baby</div>
                {/if}
            </div>
        </div>

        <div class="d-flex justify-content-evenly align-items-center my-3">
            <button class="btn btn-sm btn-danger col-2" on:click={async () => removeCounter()}>(-) Remove</button>
            <button class="btn btn-sm btn-warning col-2" on:click={async () => resetCounter()}>(=) Reset</button>
            <button class="btn btn-sm btn-success col-2" on:click={async () => addCounter()}>(+) Add</button>
        </div>

        <div class="my-3 text-center">
            <p>
                Cookies will be eaten by santa: {$cookiesCounterStore}
            </p>
        </div>
    </Accordion>
</div>
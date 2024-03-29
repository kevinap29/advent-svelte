<script lang="ts">
    import Accordion from '$lib/components/Accordion.svelte';
    import { santaHeartRateStore } from './utils'
    import { invalidateAll } from '$app/navigation';
    import { toDecimalString } from '$lib';
    import { onMount } from 'svelte';
    
    import type { PageServerData } from './$types';
    
    export let data: PageServerData;

    $: ({ santaCondition } = data)
    $: viewObject = {
        showHistoryRow: 5,
        avg: 0,
        sum: 0,
        min: 0,
        max: 0
    }

    const example = { heartRate : 65 }

    onMount(() => {
        const interval = setInterval(async () => {
            santaHeartRateStore.update(store => {
                store.unshift(santaCondition)

                return store
            })

            viewObject.sum = $santaHeartRateStore.reduce((a, b) => a + b.heartRate, 0)
            viewObject.avg = (viewObject.sum / $santaHeartRateStore.length) || 0
            viewObject.min = $santaHeartRateStore.reduce((a, b) => Math.min(a, b.heartRate), santaCondition.heartRate)
            viewObject.max = $santaHeartRateStore.reduce((a, b) => Math.max(a, b.heartRate), santaCondition.heartRate)

            await invalidateAll()
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })

</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            In this particularly bustling holiday season, the focus at the North Pole has shifted towards a crucial aspect of the Christmas operation: the well-being of Santa Claus. This year, they want to set up a special system to monitor Santa's heart rate throughout the day, to ensure he stays healthy and jolly!
        </p>
        <p>
            You've been tasked with taking in the raw data to create Santa's Heart Rate Monitor (SHRM™). This system will utilize real-time data from the North Pole Health Database. The elves envision a dashboard that not only displays the live heart rate of Santa but also calculates and shows an average over specified periods. Additionally, if you're up to it they are keen on a historical view that charts Santa's heart rate over the course of the day, offering insights into how various activities and moments affect him.
        </p>
        <p>
            Svelte Bot setup a JSON endpoint for you to get the live data, which updates every second: 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-four.json">
                    https://advent.sveltesociety.dev/data/2023/day-four.json
                </a>
            </span>
            . Here is what that data looks like:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    {'{'} 
                        <span class="text-danger">"heartRate"</span>: <span class="text-warning">"{example.heartRate}"</span> 
                    {'}'} 
                </code>
            </div>
        </pre>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="text-center">
            <h1>Current Santa Heart Rate: </h1>
            <p class="display-5 my-3">{santaCondition.heartRate}</p>

            <div class="card mt-5">
                <div class="card-header">
                    <h3 class="my-3">History of Santa Heart Rate</h3>
                </div>
                <div class="card-body">
                    {#each $santaHeartRateStore.slice(0, viewObject.showHistoryRow) as item, index}
                        <p>
                            <span>{index + 1}.</span> <span class="fw-bold">{item.heartRate} Heart Rate</span> on {item.createdDate}
                        </p>
                    {/each}
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-6 d-flex justify-content-evenly align-items-center">
                            <h5>Min: {toDecimalString(viewObject.min)}</h5>
                            <h5>Avg: {toDecimalString(viewObject.avg)}</h5>
                            <h5>Max: {toDecimalString(viewObject.max)}</h5>
                        </div>  
                        <div class="col-6">
                            <div class="form-floating">
                                <select class="form-select" id="selectShowRow" aria-label="Row to Show" on:change={e => {
                                    viewObject.showHistoryRow = parseInt(e.currentTarget.value)
                                }}>
                                    <option value="5" aria-disabled="true" aria-selected="true" disabled selected>Default</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label for="floatingSelect">Row to Show</label>
                            </div>
                        </div>  
                    </div>

                </div>
            </div>

        </div>
    </Accordion>
</div>
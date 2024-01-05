<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import Table from "$lib/components/Table.svelte";
    import { afterNavigate, invalidateAll } from "$app/navigation";
    import { ChildAndGiftWeight, type ChildAndGiftWeightType } from './utils'
    import { toDecimal, toDecimalString } from '$lib'
    import { onMount } from "svelte";

    import type { PageServerData } from './$types'

    export let data: PageServerData

    $: ({ listChild } = data)
    $: listSantaSleigh = [] as ChildAndGiftWeight[]
    $: totalSleighWeight = 0
    $: totalChildGiftWeight = toDecimalString(listChild.reduce((accumulator, next) => {
        return toDecimal(accumulator) + toDecimal(next.weight)
    }, toDecimal(0)))

    const example: ChildAndGiftWeightType[] = [
        { "name": "Kurtis", "weight": 8.20 },
        { "name": "Branson", "weight": 4.31 },
        { "name": "Danielle", "weight": 7.40 },
        { "name": "Wanda", "weight": 7.04 },
        { "name": "Claud", "weight": 4.93 }
    ]

    function getTotalWeight() {
        return Number(localStorage.getItem('TotalWeight') || '0')
    }

    async function addToSleigh(item: ChildAndGiftWeight) {
        let totalWeight = toDecimal(getTotalWeight())
        let sumWeight = totalWeight + toDecimal(item.weight)

        if (sumWeight > 100) {
            alert('Sleigh is overweight!')
            return
        }

        listChild = listChild.filter(a => a.name != item.name && a.weight != item.weight)
        listSantaSleigh = [item, ...listSantaSleigh]
        totalSleighWeight = toDecimal(sumWeight)
        totalChildGiftWeight = toDecimalString(listChild.reduce((accumulator, next) => {
            return toDecimal(accumulator) + toDecimal(next.weight)
        }, toDecimal(0)))
        
        localStorage.setItem('TotalWeight', toDecimalString(sumWeight))
    }

    async function removeFromSleigh(item: ChildAndGiftWeight) {
        let totalWeight = toDecimal(getTotalWeight())
        let sumWeight = totalWeight - toDecimal(item.weight)

        if (sumWeight < 0) {
            alert('Sleigh is empty!')
            return
        }

        listSantaSleigh = listSantaSleigh.filter(a => a.name != item.name && a.weight != item.weight)
        listChild = [item, ...listChild]
        totalSleighWeight = toDecimal(sumWeight)
        totalChildGiftWeight = toDecimalString(listChild.reduce((accumulator, next) => {
            return toDecimal(accumulator) + toDecimal(next.weight)
        }, toDecimal(0)))
        
        localStorage.setItem('TotalWeight', toDecimalString(sumWeight))
    }

    onMount(async () => {
        localStorage.removeItem('TotalWeight')
    })

    afterNavigate(async () => {
        await invalidateAll()

        localStorage.removeItem('TotalWeight')
    })
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            With the elves now back busily crafting gifts and the festive atmosphere at its peak, attention shifts to the crucial task of loading Santa's sleigh. However, Svelte Bot, with it's precise calculations, has brought to light a critical limitation: Santa's sleigh can carry a maximum load of only 100 kg per journey.
        </p>
        <p>
            Your mission is to help the Elves solve this crucial task. You'll be in charge of creating a Sleigh Load Balancer (SLB™), a tool designed to ensure that the sleigh is packed efficiently without exceeding its maximum capacity.
        </p>
        <p>
            The Elves have kept a meticulous record of all the children and the weight of their presents in a JSON format. It's your job to use this data to help keep the Sleigh within it's new operating weight. You should create a tool where Santa can choose whose presents to include on his run. The tool should show the current sleigh load and if the maximum of 100kg has been exceeded.
        </p>
        <p>
            As a bonus you could include an exciting data visualization, or even a drag and drop interface!
        </p>
        <p>
            Here is an example of what the Elves have stored:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    [
                    {#each example as item}
                        {'{'} <span class="text-danger">"name"</span>: <span class="text-warning">"{item.name}"</span>, <span class="text-danger">"weight"</span>: <span class="text-warning">{item.weight}</span> {'}'}
                    {/each}
                        ...
                    ]
                </code>
            </div>
        </pre>
        <p>
            You can fetch this data by making a GET request to 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-three.json">
                    https://advent.sveltesociety.dev/data/2023/day-three.json
                </a>
            </span>
        </p>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="row">
            <div class="col-md-6">
                <h3 class="text-center">List of Child ({totalChildGiftWeight} KG)</h3>
                <Table striped>
                    <svelte:fragment slot="thead">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Action</th>
                    </svelte:fragment>
        
                    <svelte:fragment slot="tbody">
                        {#each listChild as child, index}
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{child.name}</td>
                                <td>{toDecimalString(child.weight)}</td>
                                <td>
                                    <button class="btn btn-sm btn-success" on:click={async () => addToSleigh(new ChildAndGiftWeight(child.name, toDecimal(child.weight)).toJson())}>{`Add =>`}</button>
                                </td>
                            </tr>
                        {/each}
                    </svelte:fragment> 
                </Table> 
            </div> 
            <div class="col-md-6"> 
                <h3 class="text-center">Santa's sleigh ({totalSleighWeight} KG)</h3> 
                <Table striped> 
                    <svelte:fragment slot="thead"> 
                        <th scope="col">#</th> 
                        <th scope="col">Name</th> 
                        <th scope="col">Weight</th> 
                        <th scope="col">Action</th> 
                    </svelte:fragment> 
        
                    <svelte:fragment slot="tbody">
                        {#each listSantaSleigh as child, index} 
                            <tr> 
                                <th scope="row">{index + 1}</th>
                                <td>{child.name}</td> 
                                <td>{toDecimalString(child.weight)}</td>
                                <td> 
                                    <button class="btn btn-sm btn-danger" on:click={async () => removeFromSleigh(new ChildAndGiftWeight(child.name, toDecimal(child.weight)).toJson())}>{`<= Remove`}</button> 
                                </td> 
                            </tr> 
                        {/each} 
                    </svelte:fragment> 
                </Table> 
            </div> 
        </div> 
    </Accordion> 
</div> 
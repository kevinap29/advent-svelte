<script lang="ts">
    import Enumerable from "linq";
    import Accordion from "$lib/components/Accordion.svelte";
    import Table from "$lib/components/Table.svelte";
    import { invalidateAll } from "$app/navigation";
    import { toDecimalString } from '$lib'
    import { onMount } from "svelte";

    import type { PageServerData } from './$types';
    import type { Task, TaskType, ViewObjectDay5 } from "./utils";
    
    export let data: PageServerData;

    $: ({ elfProductivity, elfGroupingProductivity } = data)
    $: viewObject = {
        listTaskType: [],
        selectedListTaskType: 'ALL',
        aggregateListTask: {
            avgCreatedToysHours: 0,
            avgCreatedToysMinutes: 0,
            avgWrappedPresentHours: 0,
            avgWrappedPresentMinutes:0,
            countCreatedToys: 0,
            countWrappedPresent: 0,
            sumCreatedToysHours: 0,
            sumCreatedToysMinutes: 0,
            sumWrappedPresentHours: 0,
            sumWrappedPresentMinutes:0,
        }
    } as ViewObjectDay5

    const example: Task[] = [
        {
            "elf": "Ashlynn",
            "task": "WRAPPED_PRESENT",
            "minutesTaken": 3,
            "date": "2024-01-05T00:3:00.000Z"
        },
        {
            "elf": "Ashlynn",
            "task": "CREATED_TOY",
            "minutesTaken": 15,
            "date": "2024-01-05T00:18:00.000Z"
        }
    ]

    async function aggregateElfProductivity() {
        const createdToys = Enumerable.from(elfProductivity)
            .where(a => a.task === 'CREATED_TOY')
            .select(a => a)
        const wrappedPresent = Enumerable.from(elfProductivity)
            .where(a => a.task === 'WRAPPED_PRESENT')
            .select(a => a)

        viewObject.aggregateListTask.avgCreatedToysHours = createdToys.select(a => a.hoursTaken)
            .average()
        viewObject.aggregateListTask.avgCreatedToysMinutes = createdToys.select(a => a.minutesTaken)
            .average()
        viewObject.aggregateListTask.avgWrappedPresentHours = wrappedPresent.select(a => a.hoursTaken)
            .average()
        viewObject.aggregateListTask.avgWrappedPresentMinutes = wrappedPresent.select(a => a.minutesTaken)
            .average()
        viewObject.aggregateListTask.sumCreatedToysHours = createdToys.select(a => a.hoursTaken)
            .sum()
        viewObject.aggregateListTask.sumCreatedToysMinutes = createdToys.select(a => a.minutesTaken)
            .sum()
        viewObject.aggregateListTask.sumWrappedPresentHours = wrappedPresent.select(a => a.hoursTaken)
            .sum()
        viewObject.aggregateListTask.sumWrappedPresentMinutes = wrappedPresent.select(a => a.minutesTaken)
            .sum()
        viewObject.aggregateListTask.countCreatedToys = createdToys.count()
        viewObject.aggregateListTask.countWrappedPresent = wrappedPresent.count()
    }

    async function filterByTaskType(task: TaskType | 'ALL') {
        const filterGroupedTo = async (taskType: TaskType) => {
            return Enumerable.from(elfGroupingProductivity)
                .where(a => a.task === taskType)
                .toArray()
        }
        const filterTo = async (taskType: TaskType) => {
            return Enumerable.from(elfProductivity)
                .where(a => a.task === taskType)
                .toArray()
        }

        switch (task) {
            case 'ALL':
                await invalidateAll()
                await aggregateElfProductivity()
                break;

            case 'CREATED_TOY':
                await invalidateAll()

                elfGroupingProductivity = await filterGroupedTo(task)
                elfProductivity = await filterTo(task)

                await aggregateElfProductivity()
                break;
                
            case 'WRAPPED_PRESENT':
                await invalidateAll()

                elfGroupingProductivity = await filterGroupedTo(task)
                elfProductivity = await filterTo(task)

                await aggregateElfProductivity()
                break;
        
            default:
                await invalidateAll()
                await aggregateElfProductivity()
                break;
        }
    }

    async function handleFilterByTask(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
        const taskType = e.currentTarget.getAttribute('data-task-type')

        if (!taskType) return
        
        viewObject.selectedListTaskType = taskType as TaskType | 'ALL'

        // await filterByTaskType(viewObject.selectedListTaskType, elfGrouping)
        await filterByTaskType(viewObject.selectedListTaskType)
    }

    onMount(() => {
        viewObject.listTaskType = Enumerable.from(elfGroupingProductivity)
            .select(a => a.task)
            .distinct()
            .toArray()
        
        viewObject.listTaskType.unshift('ALL')
        
        const interval = setInterval(async () => {
            // await filterByTaskType(viewObject.selectedListTaskType, elfGrouping)
            await filterByTaskType(viewObject.selectedListTaskType)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            Despite the preparation for Christmas kicking off early in the year, the Elves are behind schedule. Santa, ever so reliant on their craftsmanship, turns to you for a solution. Svelte Bot, with its keen understanding of data-driven solutions, suggests building an “Elf Productivity Dashboard”.
        </p>
        <p>
            This dashboard, powered by Svelte's reactive magic, will provide real-time insights into the elves' workflow. There are two primary tasks that we're tracking, represented in the JSON data by “CREATED_TOY” and “WRAPPED_PRESENT”. You'll can tap into information such as the number of toys produced per hour, the time taken for each toy, and the elves' task completion rates. Your mission is to visualise this data in an engaging and interactive way, and show the data in realtime as it'll be changing throughout the day.
        </p>
        <p>
            Svelte Bot setup a JSON endpoint for you to get the live data, which updates every second: 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-five.json">
                    https://advent.sveltesociety.dev/data/2023/day-five.json
                </a>
            </span>. Here is what that data looks like:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    [
                    {#each example as item, index}
                        {'{'} 
                            <span class="text-danger">"elf"</span>: <span class="text-warning">"{item.elf}"</span>, 
                            <span class="text-danger">"task"</span>: <span class="text-warning">"{item.task}"</span>, 
                            <span class="text-danger">"minutesTaken"</span>: <span class="text-warning">{item.minutesTaken}</span>, 
                            <span class="text-danger">"date"</span>: <span class="text-warning">"{item.date}"</span>, 
                        {'},'}
                    {/each}
                        ...
                    ]
                </code>
            </div>
        </pre>
        <p>
            Or as a TypeScript type:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    <span style="color: mediumorchid;">type</span> <span>TaskType</span> = <span class="text-info">'CREATED_TOY'</span> | <span class="text-info">'WRAPPED_PRESENT'</span>

                    <span style="color: mediumorchid;">interface</span> <span>Task</span> {'{'} 
                        <span class="text-danger">elf</span>: <span class="text-warning">string</span>, 
                        <span class="text-danger">task</span>: <span>TaskType</span>, 
                        <span class="text-danger">minutesTaken</span>: <span class="text-warning">number</span>, 
                        <span class="text-danger">date</span>: <span class="text-warning">string</span>, 
                    {'}'}
                </code>
            </div>
        </pre>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="card m-3">
            <div class="card-header text-center position-relative">
                <h3>Total</h3>
                <div class="position-absolute top-0 end-0">
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">filter</button>

                        <ul class="dropdown-menu">
                            {#each viewObject.listTaskType as task }
                                <li>
                                    <button class="btn dropdown-item {viewObject.selectedListTaskType === task ? 'active' : ''}" data-task-type={task} 
                                        on:click={handleFilterByTask}
                                    >
                                        {task}
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body d-flex justify-content-evenly align-items-center">
                <p>
                    <span class="fw-bold">Total Toy's create:</span> {viewObject.aggregateListTask.countCreatedToys}
                </p>
                <p>
                    <span class="fw-bold">Total Present's wrapped:</span> {viewObject.aggregateListTask.countWrappedPresent} 
                </p>
            </div>
        </div>
        <div class="row p-0 m-0">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center"><h3>Average</h3></div>
                    <div class="card-body row p-0 m-0">
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Toy's create/hour: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.avgCreatedToysHours)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Toy's create/minute: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.avgCreatedToysMinutes)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Present's wrapped/hour: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.avgWrappedPresentHours)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Present's wrapped/minute: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.avgWrappedPresentMinutes)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header text-center"><h3>Sum</h3></div>
                    <div class="card-body row p-0 m-0">
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Toy's create/hour: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.sumCreatedToysHours)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Toy's create/minute: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.sumCreatedToysMinutes)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Present's wrapped/hour: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.sumWrappedPresentHours)}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p>
                                <span class="fw-bold">Present's wrapped/minute: </span>
                                <br>{toDecimalString(viewObject.aggregateListTask.sumWrappedPresentMinutes)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-3">
            <h3 class="text-center my-3">Data</h3>
            <Table striped>
                <svelte:fragment slot="thead">
                    <th scope="col">#</th>
                    <th scope="col">Elf</th>
                    <th scope="col">Task</th>
                    <th scope="col">Minutes</th>
                    <th scope="col">Hours</th>
                </svelte:fragment>
    
                <svelte:fragment slot="tbody">
                    {#each elfGroupingProductivity as productivity}
                        <tr>
                            <th scope="row">{productivity.id}</th>
                            <td>{productivity.elf}</td>
                            <td>{productivity.task}</td>
                            <td>{toDecimalString(productivity.minutesTaken)}</td>
                            <td>{toDecimalString(productivity.hoursTaken)}</td>
                        </tr>
                    {/each}
                </svelte:fragment> 
            </Table> 
        </div>
    </Accordion>
</div>
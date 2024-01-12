import Enumerable from 'linq'
import { TaskGrouping, type Task, type TaskType } from "./utils";

import type { PageServerLoad } from './$types';

export const load = (async () => {
    let elfProductivity: Task[] = []
    let elfGrouping: TaskGrouping[] = []
    let elfGroupingProductivity: TaskGrouping[] = []

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-five.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }) 
        const data = await response.json() as Task[]

        if (data.length < 1) throw Error('Data empty', { cause: '404' })

        elfProductivity = data
    } catch {
        elfProductivity = []
    }

    try {
        if (elfProductivity.length < 1) throw Error()

        elfGrouping = elfProductivity.map<TaskGrouping>((a, index) => {
            return new TaskGrouping(index + 1, a.elf, a.task, a.minutesTaken).toJson()
        })
    } catch {
        elfGrouping = []
    }

    try {
        if (elfProductivity.length < 1) throw Error()

        const query = Enumerable.from(elfProductivity)
            .groupBy(a => a.elf)
            .select(a => ({
                elf: a.key(),
                tasks: a
                    .groupBy(b => b.task)
                    .select(b => ({ name: b.key(), minutes: b.sum(c => c.minutesTaken) }))
                    .toArray()
            }))
            .toArray()
        
        if (query.length < 1) throw Error()

        let index = 1

        query.forEach(a => {
            a.tasks.forEach(b => {
                elfGroupingProductivity.push(new TaskGrouping(index, a.elf, b.name, b.minutes).toJson())

                index += 1
            })
        })
    } catch {
        elfGroupingProductivity = []
    }
    return {
        elfProductivity: elfGrouping,
        elfGroupingProductivity
    };
}) satisfies PageServerLoad;
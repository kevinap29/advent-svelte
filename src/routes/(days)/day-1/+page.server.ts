import { ChildAndTally, type ChildAndTallyType } from './utils'
import type { PageServerLoad } from './$types'

export const load = (async ({ fetch }) => {
    let listChild: ChildAndTally[] = []

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-one.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        })
        const data = await response.json() as ChildAndTallyType[]

        if (data.length < 1) throw Error('Data empty', { cause: '404' })

        listChild = data.map(a => {
            return new ChildAndTally(a.name, a.tally).toJson()
        })
    } catch {
        listChild = []
    }

    return {
        listChild
    }
}) satisfies PageServerLoad
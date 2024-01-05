import type { PageServerLoad } from './$types';
import { ChildAndGiftWeight, type ChildAndGiftWeightType } from './utils'

export const load = (async () => {
    let listChild: ChildAndGiftWeight[]

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-three.json`) 
        const data = await response.json() as ChildAndGiftWeightType[]

        if (data.length < 1) throw Error('Data empty', { cause: '404' })

        listChild = data.map(a => {
            return new ChildAndGiftWeight(a.name, a.weight).toJson()
        })
    } catch {
        listChild = []
    }

    return {
        listChild
    }
}) satisfies PageServerLoad;
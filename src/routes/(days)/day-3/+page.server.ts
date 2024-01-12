import { ChildAndGiftWeight, type ChildAndGiftWeightType } from './utils'

import type { PageServerLoad } from './$types';

export const load = (async () => {
    let listChild: ChildAndGiftWeight[]

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-three.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }) 
        const data = await response.json() as ChildAndGiftWeightType[]

        if (data.length < 1) throw Error('Data empty', { cause: '404' })

        listChild = data.map<ChildAndGiftWeight>((a, index) => {
            return new ChildAndGiftWeight(index+1, a.name, a.weight).toJson()
        })
    } catch {
        listChild = []
    }

    return {
        listChild
    }
}) satisfies PageServerLoad;
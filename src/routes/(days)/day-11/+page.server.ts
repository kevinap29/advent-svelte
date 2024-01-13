import { type NameList } from './utils'
import type { PageServerLoad } from './$types';

export const load = (async () => {
    let listName: NameList = { firstNames: [], lastNames: [] }

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-eleven.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }) 
        const data = await response.json() as NameList

        if (!data) throw Error('Data empty', { cause: '404' })

        listName = data
    } catch {
        listName = { firstNames: [], lastNames: [] }
    }

    return {
        listName
    };
}) satisfies PageServerLoad;
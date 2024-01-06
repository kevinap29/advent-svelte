import type { PageServerLoad } from './$types';
import type { SantaHeartRate } from './utils'

export const load = (async () => {
    let santaCondition: SantaHeartRate

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-four.json`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
        }) 
        const data = await response.json() as SantaHeartRate

        if (data.heartRate < 1) throw Error('Data empty', { cause: '404' })

        santaCondition = data
        santaCondition.createdDate = new Date()
    } catch {
        santaCondition = { heartRate: 0, createdDate: new Date() }
    }

    return {
        santaCondition
    }
}) satisfies PageServerLoad;
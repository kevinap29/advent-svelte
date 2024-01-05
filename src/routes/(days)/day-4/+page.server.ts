import type { PageServerLoad } from './$types';
import type { SantaHeartRate } from './utils'

export const load = (async () => {
    let santaCondition: SantaHeartRate

    try {
        const response = await fetch(`https://advent.sveltesociety.dev/data/2023/day-four.json`) 
        const data = await response.json() as SantaHeartRate

        if (data.heartRate < 1) throw Error('Data empty', { cause: '404' })

        santaCondition = data
    } catch {
        santaCondition = { heartRate: 0 }
    }

    return {
        santaCondition
    }
}) satisfies PageServerLoad;
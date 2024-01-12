// import Enumerable from 'linq';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
    // let listImage: string[] = [];
    // try {
    //     const range = Enumerable.range(1,5).toArray()

    //     for await (const i of range) {
    //         const url = `https://advent.sveltesociety.dev/data/2023/day-eight/${i}.png`
            
    //         const response = await fetch(url, {
    //             method: 'GET'
    //         })
    //         const data = await response.arrayBuffer()
            
    //         listImage.push(Buffer.from(data).toString('base64'))
    //     }
    // } catch {
    //     listImage = []
    // }

    return {
        // listImage
    };
}) satisfies PageServerLoad;
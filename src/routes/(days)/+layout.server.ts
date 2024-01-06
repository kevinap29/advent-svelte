import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const inherit = await parent()
    
    return {
        pageTitle: inherit.pageTitle
    }
}) satisfies LayoutServerLoad;
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
    const inherit = await parent()

    return {
        pageTitle: inherit.pageTitle,
        navLink: inherit.navlink
    }
}) satisfies LayoutServerLoad;
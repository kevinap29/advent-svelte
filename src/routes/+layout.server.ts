import type { LayoutServerLoad } from './$types'
import type { IResponse } from '$routes/api/@types'
import type { NavigationLink } from '$lib/components/@types'

export const load = (async ({ fetch, url }) => {
    const responseNavLink: IResponse<NavigationLink[]> = { status: 500, message: 'Not initialize', value: [] }

    try {
        const response = await fetch(`${url.origin}/api/public/days`)
        const data = await response.json() as IResponse<NavigationLink[]>

        responseNavLink.status = data.status
        responseNavLink.message = data.message
        responseNavLink.value = data.value
    } catch (error) {
        const err = error as Error

        responseNavLink.status = parseInt(err.cause as string || "500")
        responseNavLink.message = err.message
        responseNavLink.value = []
    }
    
    return {
        navlink: responseNavLink.value
    }
}) satisfies LayoutServerLoad
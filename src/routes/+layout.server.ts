import type { LayoutServerLoad } from './$types'
import type { IResponse } from '$routes/api/@types'
import type { NavigationLink } from '$lib/components/@types'

export const load = (async ({ fetch, url }) => {
    let pageTitle: string | undefined
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

    try {
        if (responseNavLink.value.length < 1) throw Error()

        const navlink = responseNavLink.value.filter(a => url.pathname === `/${a.url}`).at(0)

        if (!navlink) throw Error()

        pageTitle = navlink.title.split('|').at(1)?.trim()
    } catch {
        pageTitle = undefined
    }
    
    return {
        pageTitle,
        navlink: responseNavLink.value,
    }
}) satisfies LayoutServerLoad
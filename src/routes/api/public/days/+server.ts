import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { IResponse } from '$routes/api/@types';
import type { NavigationLink } from '$lib/components/@types';

export const GET = (async ({ url }) => {
    return json({
        status: 200,
        message: 'Get all list of navigation',
        value: [
            { url: 'day-1', title: 'Day 1 | Naughty or Nice' },
            { url: 'day-2', title: 'Day 2 | Merry Munch-o-Meter' },
            { url: 'day-3', title: 'Day 3 | Jingle Bell Balancer' },
            { url: 'day-4', title: 'Day 4 | Heart of Christmas' },
            { url: 'day-5', title: 'Day 5 | Present Progress' },
        ]
    } as IResponse<NavigationLink[]>)    
}) satisfies RequestHandler;

export const POST = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;

export const PUT = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;

export const DELETE = (async ({ url }) => {
    throw redirect(301, url.origin + '/api/error?status=502&message=Method not implement');
}) satisfies RequestHandler;
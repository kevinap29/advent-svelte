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
            { url: 'day-6', title: 'Day 6 | Misteltoe Metronome' },
            { url: 'day-7', title: 'Day 7 | Morse Mischief' },
            { url: 'day-8', title: "Day 8 | Santa's Mysterious Deck of Doubles" },
            { url: 'day-9', title: "Day 9 | Santa's Final Countdown" },
            { url: 'day-10', title: "Day 10 | Pop-up! Spreading the holiday cheer" },
            { url: 'day-11', title: "Day 11 | Tinsel Transformers" },
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
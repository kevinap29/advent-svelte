import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
    throw redirect(301, url.origin + '/error?status=502&message=Method not implement');
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
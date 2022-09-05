import type { IncomingMessage, ServerResponse } from "http";
import { readBody } from 'h3'

export default async (req: IncomingMessage, res: ServerResponse) => {

    if (req.method !== 'POST') return 'Must be post request'

    // @ts-ignore
    const { user } = await readBody(req) // only for POST request

    // @ts-ignore
    req.user = user;
    return { updated: true }
};
import { createClient, type NormalizeOAS } from 'npm:fets'
import type openapi from 'jsr:@smallweb/openapi'

const client = createClient<NormalizeOAS<typeof openapi>>({
    endpoint: '<your-domain>',
    globalParams: {
        headers: {
            Authorization: 'Bearer <your-token>'
        }
    }
})

const response = await client['/v0/apps'].get()

console.log(response.json()) // typed!

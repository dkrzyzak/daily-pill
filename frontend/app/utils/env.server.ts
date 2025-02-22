import { z } from 'zod';

const envSchema = z.object({
    API_GATEWAY_URL: z.string(),
});

/** 
    TODO: find a good place to run this function:
    - not root.tsx -> it is rendered by the client as well
    - not routes.ts -> env variables are not initialized there yer 
*/

export function parseEnv() {
    const result = envSchema.safeParse(process.env);

    if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        console.log(fieldErrors);
        const missingVariables = Object.keys(fieldErrors).join(', ');

        throw new Error(`Missing environment variables: ${missingVariables}`);
    }
}

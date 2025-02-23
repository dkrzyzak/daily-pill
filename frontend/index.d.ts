declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_GATEWAY_URL: string;
        }
    }

    // TODO: move it to shared types (create sub-module)
    type GoogleProfileData = {
        id: string;
        email: string;
        verified_email: boolean;
        name: string;
        given_name: string;
        family_name: string;
        picture: string;
    };
}

export {};

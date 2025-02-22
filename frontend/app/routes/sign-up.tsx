import { Button } from 'primereact/button';
import {
    useLoaderData,
    type LoaderFunctionArgs,
    type MetaFunction,
} from 'react-router';
import axios from '~/axios';

export const meta: MetaFunction = () => [{ title: 'Daily Pill | Sign Up' }];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookies = request.headers.get('Cookie');
    try {
        // TODO: create endpoint that will just return "health check" of client - is he legit or not
        // auth/verify is meant to be used internally by gateway middleware
        const res = await axios.post('/auth/verify', {
            headers: { Cookie: cookies },
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }

    return {
        googleAuthUrl: `${process.env.API_GATEWAY_URL}/auth/google/login`,
    };
};

export default function SignUpPage() {
    const { googleAuthUrl } = useLoaderData<typeof loader>();

    return (
        <main className="flex flex-col items-center justify-center h-screen">
            <section className="mb-12 flex flex-col items-center">
                <img src="/survey.svg" alt="Icon" className="w-60 ml-12" />
                <h1 className="text-3xl">Welcome to Daily Pill! </h1>
                <h2 className="text-xl text-surface-400">
                    Your daily medicine tracker
                </h2>
            </section>

            <a href={googleAuthUrl}>
                <Button
                    icon="pi pi-google"
                    severity="info"
                    raised
                    label="Continue with Google"
                />
            </a>
        </main>
    );
}

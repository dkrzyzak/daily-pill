import { Button } from 'primereact/button';
import { Link, useLoaderData, type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Daily Pill | Sign Up' }];

export const loader = () => {
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

            <Link to={googleAuthUrl}>
                <Button
                    icon="pi pi-google"
                    severity="info"
                    raised
                    label="Continue with Google"
                />
            </Link>
        </main>
    );
}

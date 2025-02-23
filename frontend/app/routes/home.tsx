import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import axios from '~/axios';
import { promised } from '~/utils/promised';

export function meta() {
    return [
        { title: 'Daily Pill' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookie = request.headers.get('cookie');

    const [userRes, userErr] = await promised(
        axios.get<GoogleProfileData>,
        '/auth/user',
        {
            headers: { Cookie: cookie },
        },
    );

    if (userErr) {
        // isAxiosError(userErr) && userErr.status === 401
        throw redirect('/sign-up');
    }

    return { user: userRes.data };
};

export default function Home() {
    const { user } = useLoaderData<typeof loader>();
    console.log(user);
    return (
        <div>
            <h1>Home page {user.given_name}</h1>
        </div>
    );
}

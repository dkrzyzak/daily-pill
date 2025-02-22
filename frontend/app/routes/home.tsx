import { redirect, type LoaderFunction } from 'react-router';
import axios from '~/axios';
import { isAxiosError } from 'axios';

export function meta() {
    return [
        { title: 'Daily Pill' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export const loader: LoaderFunction = async ({ request }) => {
    const cookie = request.headers.get('cookie');

    try {
        // TODO: check login state in a better way
        const x = await axios.get('/test', { headers: { Cookie: cookie } });
        console.log(x);
    } catch (error) {
        console.log(error);
        if (isAxiosError(error)) {
            if (error.status === 401) {
                throw redirect('/sign-up');
            }
        }
    }

    return {};
};

export default function Home() {
    return <h1>Home page</h1>;
}

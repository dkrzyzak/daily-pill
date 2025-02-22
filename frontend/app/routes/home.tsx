import { redirect, type LoaderFunction } from 'react-router';
import type { Route } from './+types/home';
import axios from '~/axios';
import { isAxiosError } from 'axios';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Daily Pill' },
        { name: 'description', content: 'Welcome to React Router!' },
    ];
}

export const loader: LoaderFunction = async () => {
    try {
        // TODO: check login state in a better way
        const x = await axios.get('/test');
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

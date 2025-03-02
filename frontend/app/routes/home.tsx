import { redirect, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import axios from '~/axios';
import { promised } from '~/utils/promised';
import { MedicineFormTrigger } from '~/modules/medicine-form/medicine-form-trigger';
import type { MedicineDto } from '~/apiModels';
import { MedicineItem } from '~/modules/medicine-item/medicine-item';

export function meta() {
    return [
        { title: 'Daily Pill' },
        { name: 'description', content: 'Welcome to Daily Pill!' },
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
        throw redirect('/sign-up');
    }

    const [medicine, medicineErr] = await promised(
        axios.get<MedicineDto[]>,
        '/medicines',
        { headers: { Cookie: cookie } },
    );

    return {
        user: userRes.data,
        medicines: medicineErr ? [] : medicine.data,
    };
};

export default function Home() {
    const { user, medicines } = useLoaderData<typeof loader>();

    return (
        <div>
            <h1 className="text-4xl">Hello, {user.given_name}!</h1>
            <section className="flex">
                <MedicineFormTrigger />
            </section>

            <section className='mt-12'>
                <h1 className='text-3xl'>Medicine you have:</h1>
                <div className='grid gap-4'>
                    {medicines.map((medicine) => (
                        <MedicineItem key={medicine.id} medicine={medicine} />
                    ))}
                </div>
            </section>
        </div>
    );
}

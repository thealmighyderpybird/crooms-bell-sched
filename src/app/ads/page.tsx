import { redirect } from 'next/navigation';
import Loading from '../loading';

export default function AdsPage() {
    return <>
        <Loading />
        { redirect('/') }
    </>;
}

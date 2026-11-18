import CroomsConAd from '~/components/CroomsConAd';
import adStyle from './page.module.css';

export default function AdPage() {
    return <div className={`bg-black min-h-screen ${adStyle.adPage}`}>
        <CroomsConAd />
    </div>;
};
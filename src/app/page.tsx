import CroomsBellScheduleApplet from '~/components/CroomsBellScheduleApplet';
import WeatherWidget from '~/components/cards/WeatherWidget';
import CardLayout from '~/components/index/IndexCardLayout';
import LunchWidget from '~/components/cards/LunchWidget';
import ThemeProvider from '~/components/ThemeProvider';
import getSiteSettings from '~/lib/getSettings';
import Card from '../components/index/Card';
import AdFrame from '~/components/AdFrame';
import RandExp from 'randexp';
import '~/styles/index.css';

export default async function Home() {
    const siteSettings = await getSiteSettings();

    return <ThemeProvider>
        <div className='flex flex-col lg:flex-row w-fit mx-auto px-2 lg:px-4 py-7 lg:py-0'>
            <CardLayout>
                <Card>
                    <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()} settings={siteSettings} />
                    <AdFrame style={{ marginBlockStart: '1rem' }} />
                </Card>
                { siteSettings.widgets.lunch && <LunchWidget /> }
                { siteSettings.widgets.weather && <WeatherWidget /> }
                { (siteSettings.layout === 'simplified' && siteSettings.widgets.prowler) &&
                    <div></div> }
            </CardLayout>
            {/* (siteSettings.layout === 'sidebar' && siteSettings.widgets.prowler) && <div className='sticky top-13 h-fit'>
                <CardLayout>
                    <div></div>
                </CardLayout>
            </div> */}
        </div>
    </ThemeProvider>;
};
import UnblockProperties from './unblock-checkbox-properties.png';
import AndroidAppScreenshot from './android-app-preview.png';
import CroomsBellScheduleLogo from '~/components/CBSHLogo';
import { userAgent } from 'next/server';
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from "next/image";

export default async function Page() {
    const { os } = userAgent({ headers: await headers() });
    const osName = os.name ?? 'Unknown';

    return <div className='container max-w-xl mx-auto p-10'>
        <header className='w-fit mx-auto mb-10 select-none'>
            <CroomsBellScheduleLogo size={48} />
            <h3 className='-mt-3! text-right font-normal!'>App</h3>
        </header>
        { osName.includes('Android') ? <AndroidDownload /> :
            (osName.includes('Windows') ? <WindowsDownload /> : <NotCompatible />) }
    </div>
};

const AndroidDownload = () => <main>
    <h2>Take your schedule in the palm of your hand</h2>
    <p>Bring your schedule to your phone and keep yourself in check of time, at all times.</p>
    <p className='text-center select-none'>
        <Link href='https://mikhail.croomsbellschedule.com/updateapiv2/com.mikhailsoftware.CBSApp.apk' download
              className='button text-[1rem] leading-none px-3 py-2.5'>Download the App</Link></p>
    <div className='w-xs mx-auto select-none mb-8'>
        <Image src={AndroidAppScreenshot.src} alt='Screenshot of the Android app on the Home screen'
               width={AndroidAppScreenshot.width} height={AndroidAppScreenshot.height} draggable='false' className='w-xs' />
        <span className='block mt-2.5 text-sm leading-none'>
            The app includes everything you'll to keep track of your day, plus more!</span>
    </div>
</main>;

const WindowsDownload = () => <main>
    <h2>Your schedule, easier to access</h2>
    <p>Bring your schedule to your Windows device and keep yourself in check of time, at all times.</p>
    <p className='text-center select-none'>
        <Link href='https://mikhail.croomsbellschedule.com/updateapiv2/CroomsBellSchedule-win-Setup.exe' download
              className='button text-[1rem] leading-none px-3 py-2.5'>Download the App</Link></p>
    <h2>Installation Information</h2>
    <p>Before you run the installer, you&apos;ll need to right-click the file, click "Properties",
        and check the checkbox that says "Unblock".</p>
    <div className='w-xs mx-auto select-none mb-8'>
        <Image src={UnblockProperties.src} alt='Screenshot of Properties window, with red box around the Unblock checkbox'
               width={UnblockProperties.width} height={UnblockProperties.height} draggable='false' className='w-xs' />
        <span className='block mt-2.5 text-sm leading-none'>
            The checkbox marked with red needs to be checked before you can run it.</span>
    </div>
    <p>Once that is complete, you can run the installer by double clicking it.
        Wait for the installation to complete, and when that is finished,
        the Crooms Bell Schedule app will be ready to go on your PC!</p>
</main>;

const NotCompatible = () => <main>
    <h2>Your schedule, easier to access</h2>
    <p>
        Our app isn't ready for your device, it is currently available for Windows and Android devices.</p>
    <p className='text-center select-none'>
        <Link href='/' className='button text-[1rem] leading-none px-3 py-2.5'>Back to the Crooms Bell Schedule</Link></p>
</main>;
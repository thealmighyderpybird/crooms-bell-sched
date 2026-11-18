'use client';

import Image, { type StaticImageData } from 'next/image';
import { hexHash } from 'next/dist/shared/lib/hash';
import GameIcon from './croomscon-icons/game.png';
import CafeIcon from './croomscon-icons/cafe.png';
import CroomsConLogo from './croomscon-logo.png';
import WinIcon from './croomscon-icons/win.png';
import { useEffect, useState } from 'react';
import Fonts from '~/styles/fonts/fonts';
import Link from 'next/link';

type SectionData = { image: StaticImageData, name: string };
type PriceData = { price: number, ends: Date };

const sectionData: SectionData[] = [
    { image: GameIcon, name: 'Games' },
    { image: WinIcon, name: 'Prizes' },
    { image: CafeIcon, name: 'Food' },
];

const priceTable: PriceData[] = [
    { price: 20, ends: new Date('2026-12-01 00:00:00 EST') },
    { price: 25, ends: new Date('2027-01-01 00:00:00 EST') },
    { price: 35, ends: new Date('2027-02-01 00:00:00 EST') },
    { price: 40, ends: new Date('2027-02-13 00:00:00 EST') },
    { price: 50, ends: new Date('2027-02-13 18:00:00 EST') },
];

export default function CroomsConAd() {
    const [price, setPrice] = useState<PriceData>({ price: 0, ends: new Date('2027-02-13 18:00:00 EST') });
    const [locale, setLocale] = useState<string[]>([]);

    useEffect(() => {
        setPrice(priceTable.find(p => p.ends.getTime() > new Date().getTime())!);
        setLocale(navigator.languages as string[]);
    }, []);

    const priceFormatter = new Intl.NumberFormat(locale, { // @ts-ignore
        trailingZeroDisplay: 'stripIfInteger',
        style: 'currency',
        currency: 'USD',
    });

    const dateFormatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
        day: 'numeric',
    });

    return <Link className='min-w-full min-h-full bg-black p-5 rounded-xl block! **:cursor-[inherit]! text-white! no-underline'
                 href='https://www.croomscon.org' target='CBSH_AD_CROOMSCON'>
        <div className={`max-w-md mx-auto select-none ${Fonts['Torus']}`}>
            <span role='heading' className='block text-center'>
                <Image src={CroomsConLogo.src} width={CroomsConLogo.width} height={CroomsConLogo.height} priority
                       alt='CroomsCon' draggable='false' className='max-w-2/3 sm:max-w-2xs mx-auto' />
                <span className='block'>February 13th, 2027</span>
            </span>
            <div className='my-5 flex gap-5'>{ sectionData.map(data =>
                <div key={hexHash(data.name)} className='w-full flex-1 sm:flex items-center justify-center'>
                    <Image src={data.image} alt={`Icon for ${data.name}`} draggable='false' loading='lazy'
                           width={data.image.width} height={data.image.height}
                           className='max-w-8 max-sm:mx-auto sm:mr-2.5' />
                    <span role='heading' className='block text-center text-xl leading-none font-bold'>
                        {data.name}</span>
                </div>
            )}</div>{ price.price > 0 &&
            <div className='text-center'>Tickets are currently <span className='text-xl font-bold'>
                {priceFormatter.format(price.price)}</span> until <span className='text-xl font-bold'>
                {dateFormatter.format(price.ends)}</span>!</div> }
            <div className='text-center mt-2.5'>
                <button className='bg-[rgb(255,153,0)] text-black! text-[1rem]'>Let's game!</button></div>
        </div>
    </Link>;
};
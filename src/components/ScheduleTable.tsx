// I know there's a select few people who have been dying for this. Enjoy! -andrew <3
'use client';
import { getDateTime, getEventName, type Schedule } from '~/lib/schedule';
import { parseTime } from '~/lib/parseEndTime';
import type Settings from '../types/settings';
import { useState, useEffect } from 'react';

/**
 * Component that renders a table containing the daily bell schedule.
 *
 * @param settings Crooms Bell Schedule site settings.
 * @param schedule Today's schedule from the CBSH API.
 * @author Andrew Jennings
 */
export default function ScheduleTable({ settings, schedule }: { settings: Settings, schedule: Schedule }) {
    const [lunch, setLunch] = useState<0|1>(settings.defaultLunch === 'A Lunch' ? 0 : 1);

    const time = getDateTime().split(' '); time.pop(); time.pop();
    const today = time.join(' ');

    useEffect(() => {
        window.addEventListener('lunchchange', handleLunchChange as EventListener);
        return () => window.removeEventListener('lunchchange', handleLunchChange as EventListener);
    }, []);

    const handleLunchChange = (e: CustomEvent) => setLunch(e.detail.lunch);

    const sc = schedule.schedule[lunch];
    if (sc == null) return <>Failed to fetch the schedule. {JSON.stringify('Lunch=' + String(lunch))}</>;
    const sched = sc.filter(e => e[2] !== 100 && e[2] !== 101 && e[2] !== 104 && e[2] !== 105 && e[2] !== 106);

    return <div className='flex flex-col *:*:px-2 *:py-1 *:*:first:w-full *:*:first:max-w-40!'>
        <div className='*:text-center flex gap-0.5 border border-(--accent-color) rounded-t-lg bg-(--accent-color) text-(--pri) select-none'>
            <div className='border-r'>Time</div>
            <div className='w-full'>Class/Event</div>
        </div>
        { sched!.map(s => <div key={s[2]} className='flex gap-0.5 border-b border-x border-(--accent-color) last:rounded-b-lg'>
            <div className='text-center border-r border-r-(--accent-color)'>
                { `${parseTime(new Date(`${today} ${s[0]}:${s[1]}`))} - ${parseTime(new Date(`${today} ${s[3]}:${s[4]}`))}` }</div>
            <div className='w-full'>{ getEventName(s[2], settings) }</div>
        </div>) }
    </div>
}
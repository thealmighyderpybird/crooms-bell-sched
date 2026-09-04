// I know there's a select few people who have been dying for this. Enjoy! -andrew <3
import { getDateTime, getEventName, getSchedule } from '~/lib/schedule';
import { parseTime } from '~/lib/parseEndTime';
import type Settings from '../types/settings';

/**
 * Component that renders a table containing the daily bell schedule.
 *
 * @param settings Crooms Bell Schedule site settings.
 * @constructor
 */
export default async function ScheduleTable({ settings }: { settings: Settings }) {
    const lunch = settings.defaultLunch === 'A Lunch' ? 0 : 1;
    const s = await getSchedule();

    const schedule = s.schedule[lunch];
    if (schedule == null) throw new Error('Failed to fetch the schedule.');
    const time = getDateTime().split(' '); time.pop(); time.pop();
    const today = time.join(' ');

    return <table className='w-full *:leading-none border-spacing-1'>
        <thead>
            <tr className='*:text-nowrap'>
                <th>Start Time</th>
                <th>Class/Event</th>
                <th>End Time</th>
            </tr>
        </thead>
        <tbody className='*:text-nowrap'>
            { schedule!.map(s => <tr key={s[2]} className='border border-(--accent-color) rounded-lg *:px-2 *:py-1'>
                <td className='text-center'>
                    { parseTime(new Date(`${today} ${s[0]}:${s[1]}`)) }</td>
                <td className='w-full'>{ getEventName(s[2], settings) }</td>
                <td className='text-center'>
                    { parseTime(new Date(`${today} ${s[3]}:${s[4]}`)) }</td>
            </tr>) }
        </tbody>
    </table>
}
'use client';

import CardHeader from '~/components/index/CardHeader';
import parseEndTime from '~/lib/parseEndTime';

export default function AlertInfo({ alertInfo }: { alertInfo: {
    event: string, senderName: string, ends: string, expires: string, description: string
}}) {
    return <>
        <CardHeader>{ alertInfo.event }</CardHeader>
        <ul className='p-0 list-none'>
            <li><b>Issued by:</b> { alertInfo.senderName }</li>
            <li><b>Expires:</b> { parseEndTime(new Date(alertInfo.ends), new Date(alertInfo.expires)) }</li>
        </ul>
        <pre className='break-after-all mb-0 overflow-x-auto whitespace-normal'>{ alertInfo.description }</pre>
    </>;
}
'use client';

import CBSHServerURL from '~/lib/CBSHServerURL';
import { useState } from 'react';

export default function ReadAllAnnouncements() {
    const [loading, setLoading] = useState(false);

    const markAllRead = async () => {
        setLoading(true);
        try {
            const r = await fetch(CBSHServerURL + '/announcements/website');
            const data = await r.json() as { status: string, data: Array<{ id: string }> };
            if (data?.data) {
                const ids = data.data.map(a => a.id);
                localStorage.setItem('viewed-announcements', JSON.stringify(ids));
                // notify other components
                window.dispatchEvent(new CustomEvent('announcements-read-all', { detail: ids }));
            }
        } catch (e) {
            // ignore
        } finally {
            setLoading(false);
        }
    };

    return <div className='rounded-lg' title='Mark all announcements as read'>
        <button className='text-[0.9rem] min-w-27 px-4 py-[.45rem]' onClick={markAllRead} disabled={loading}>
            { loading ? 'Please wait...' : 'Mark all as Read' }</button>
    </div>;
}

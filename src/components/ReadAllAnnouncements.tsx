"use client";

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

    return <div className='p-3 flex flex-row items-center' title='Mark all announcements as read'>
        <button className='button' onClick={markAllRead} disabled={loading}>{ loading ? 'Reading...' : 'Read all' }</button>
    </div>;
}

"use client";

import OptionSelect from "~/components/settings/OptionSelect";
import { changeDefaultLunch } from "~/lib/settingsManager";
import {useEffect, useState} from "react";

export default function DefaultLunch({ lunch }: { lunch: 'A Lunch' | 'B Lunch' | undefined }) {
    const [defaultLunch, setDefaultLunch] = useState(lunch ?? 'A Lunch');

    useEffect(() => {
        window.addEventListener('lunchchange', handleLunchChange as EventListener);
        return () => window.removeEventListener('lunchchange', handleLunchChange as EventListener);
    }, []);

    const handleLunchChange = (e: CustomEvent) =>
        setDefaultLunch(e.detail.lunch === 0 ? 'A Lunch' : 'B Lunch');

    return <OptionSelect value={defaultLunch} onChange={(e) => {
        window.dispatchEvent(new CustomEvent('lunchchange',
            { detail: { lunch: e.currentTarget.value === 'A Lunch' ? 0 : 1 }}));
        setDefaultLunch(e.currentTarget.value as 'A Lunch' | 'B Lunch');
        changeDefaultLunch(e);
    }} style={{ fontSize: 'revert' }}>
        <option value='A Lunch'>A Lunch</option>
        <option value='B Lunch'>B Lunch</option>
    </OptionSelect>;
};
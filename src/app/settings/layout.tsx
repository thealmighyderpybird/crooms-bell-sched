import CardLayout from '~/components/index/CardLayout';
import type { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <h1 className='select-none leading-none last:mb-6'>Settings</h1>
        { children }
    </CardLayout>;
}
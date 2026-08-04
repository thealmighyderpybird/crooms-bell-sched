import type { ReactNode } from 'react';

export default interface QueryResult {
    title: string,
    description: string,
    icon: string | ReactNode,
    action: () => void,
}
import type { HTMLProps } from 'react';

export default function AdFrame(props: HTMLProps<HTMLIFrameElement>) {
    return <iframe src='https://ad.crooms.to' height={175} className='select-none' {...props}></iframe>
};



/// What I found in term of bugs Back arrow button doesn't work  for banner.

/// Double overlay error when I click suggest tool and it dupes top UI on top of it.

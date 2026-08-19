import Link from 'next/link';

export default function SuggestPage() {
    return (
        <div className='flex flex-col justify-center items-center max-w-md mx-auto select-none text-center' style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <img draggable='false' alt='Clippy' loading='lazy' width={250} height={250}
                 src='/images/clippy.png' className='w-62.5 h-auto mb-4 p-4 rounded-lg bg-(--pri)' />
            <h1 className='text-2xl font-bold'>Suggest a Tool</h1>
            <p className='mt-2 text-sm'>Have an idea for a tool? Tell us about it below.</p>
            <form className='mt-4 w-full max-w-sm' action='/api/tools/suggest' method='post'>
                <div className='flex flex-col gap-2'>
                    <input name='name' placeholder='Tool name' className='p-2 rounded bg-(--sec) w-full' />
                    <input name='link' placeholder='URL' className='p-2 rounded bg-(--sec) w-full' />
                    <textarea name='notes' placeholder='Why is it useful?' className='p-2 rounded bg-(--sec) w-full' />
                    <div className='flex justify-end gap-2'>
                        <Link href='/' className='button'>Cancel</Link>
                        <button type='submit' className='button'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

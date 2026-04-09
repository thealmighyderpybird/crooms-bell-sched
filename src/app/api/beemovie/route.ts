import { NextResponse } from 'next/server';
import BeeMovie from 'beemovie';

export async function GET() {
    NextResponse.json({ body: BeeMovie.Script() });
}
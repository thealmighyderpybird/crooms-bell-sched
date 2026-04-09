import { NextResponse } from 'next/server';
import { Script } from 'beemovie';

export async function GET() {
    return NextResponse.json(Script());
}
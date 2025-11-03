import streamServerURL from "~/lib/StreamServerURL";
import { NextResponse } from "next/server";
import http from "http";

export async function GET(_: Request, { params }: { params: Promise<{ streamName: string }> }) {
    const mount = (await params)?.streamName ? `/${(await params).streamName}` : "/stream";

    return new Promise<NextResponse>((resolve) => {
        const req = http.get(streamServerURL + mount,
            { headers: { "Icy-MetaData": "1", "User-Agent": "metadata-fetcher" } },
            (res) => {
                const icyMetaInt = parseInt(
                    res.headers["icy-metaint"] as string || res.headers["Icy-MetaInt"] as string || "0",
                    10
                );
                if (!icyMetaInt) {
                    res.destroy();
                    return resolve(NextResponse.json({ title: null, error: "No icy-metaint header" }));
                }

                let bytesCollected = 0;
                let audioBuffer = Buffer.alloc(0);

                res.on("data", (chunk: Buffer) => {
                    if (bytesCollected >= icyMetaInt) return;
                    const need = Math.max(0, icyMetaInt - bytesCollected);
                    const take = Math.min(chunk.length, need);
                    audioBuffer = Buffer.concat([audioBuffer, chunk.subarray(0, take)]);
                    bytesCollected += take;

                    if (bytesCollected >= icyMetaInt) {
                        const remaining = chunk.subarray(take);
                        if (remaining.length === 0) return;
                        const metaLen = remaining[0]! * 16;
                        const metaBuf = Buffer.alloc(metaLen);
                        let filled = 0;

                        const drainMeta = (buf: Buffer) => {
                            const takeNow = Math.min(metaLen - filled, buf.length);
                            buf.copy(metaBuf, filled, 0, takeNow);
                            filled += takeNow;
                            return buf.subarray(takeNow);
                        };

                        let leftover = drainMeta(remaining.subarray(1));
                        if (filled >= metaLen || metaLen === 0) finish(metaBuf.slice(0, filled));
                        else {
                            const onData = (nextChunk: Buffer) => {
                                leftover = drainMeta(nextChunk);
                                if (filled >= metaLen) {
                                    res.removeListener("data", onData);
                                    finish(metaBuf.slice(0, filled));
                                }
                            };
                            res.on("data", onData);
                        }
                    }
                });

                const finish = (metaBytes: Buffer) => {
                    const meta = metaBytes.toString("utf8").replace(/\0/g, "");
                    // robust parsing for titles with apostrophes
                    let title: string | null = null;
                    const start = meta.indexOf("StreamTitle='");
                    if (start !== -1) {
                        const end = meta.indexOf("';", start + 13);
                        if (end !== -1) title = meta.slice(start + 13, end);
                    }
                    res.destroy();
                    resolve(NextResponse.json({ title }));
                };

                res.on("error", (err) => {
                    res.destroy();
                    resolve(NextResponse.json({ title: null, error: err.message }));
                });
            }
        );

        req.on("error", (err) =>
            resolve(NextResponse.json({ title: null, error: err.message }))
        );
        req.setTimeout(5000, () => req.destroy());
    });
}
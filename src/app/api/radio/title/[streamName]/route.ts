import streamServerURL from "~/lib/StreamServerURL";
import http from "http";

export async function GET(_: Request, { params }: { params: { streamName: string } }) {
    const mount = params?.streamName ? `/${params.streamName}` : "/stream";

    return new Promise((resolve) => {
        const req = http.get(
            streamServerURL + mount,
            {headers: {"Icy-MetaData": "1", "User-Agent": "metadata-fetcher"}},
            (res) => {
                const icyMetaInt = parseInt(res.headers["icy-metaint"] as string || res.headers["Icy-MetaInt"] as string || "0", 10);
                if (!icyMetaInt) {
                    res.destroy();
                    return resolve(new Response(JSON.stringify({
                        title: null,
                        error: "No icy-metaint header"
                    }), {status: 500}));
                }

                let bytesCollected = 0;
                let audioBuffer = Buffer.alloc(0);

                res.on("data", (chunk) => {
                    if (bytesCollected >= icyMetaInt) return; // already handled
                    const need = Math.max(0, icyMetaInt - bytesCollected);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    const take = chunk.length as number >= need ? need : chunk.length as number;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                    audioBuffer = Buffer.concat([audioBuffer, chunk.slice(0, take)]);
                    bytesCollected += take;

                    if (bytesCollected >= icyMetaInt) {
                        // next byte after the audio block is metadata length (in 16-byte blocks)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        const remaining = chunk.slice(take);
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        if (remaining.length === 0) {
                            // wait for the next 'data' to get the metadata length byte
                            return;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                        const metaLenByte = remaining[0];
                        const metaLen = metaLenByte * 16;
                        const metaBuf = Buffer.alloc(metaLen);
                        let filled = 0;

                        // Helper to drain remaining bytes and then subsequent chunks until meta filled
                        const drainMeta = (buf: { length: number; copy: (arg0: Buffer<ArrayBuffer>, arg1: number, arg2: number, arg3: number) => void; slice: (arg0: number) => never; }) => {
                            const takeNow = Math.min(metaLen - filled, buf.length);
                            buf.copy(metaBuf, filled, 0, takeNow);
                            filled += takeNow;
                             
                            return buf.slice(takeNow); // leftover after consuming
                        };

                        // consume any leftover from the same chunk beyond the length byte
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
                        let leftover = drainMeta(remaining.slice(1));
                        if (filled >= metaLen || metaLen === 0) {
                            finishParsing(metaBuf.slice(0, filled));
                        } else {
                            // attach a temporary listener to continue filling metadata
                            const onData = (nextChunk: { length: number; copy: (arg0: Buffer<ArrayBuffer>, arg1: number, arg2: number, arg3: number) => void; slice: (arg0: number) => never; }) => {
                                leftover = drainMeta(nextChunk);
                                if (filled >= metaLen) {
                                    res.removeListener("data", onData);
                                    finishParsing(metaBuf.slice(0, filled));
                                }
                            };
                            res.on("data", onData);
                        }
                    }
                });

                const finishParsing = (metaBytes: Buffer<ArrayBuffer>) => {
                    const meta = metaBytes.toString("utf8").replace(/\0/g, "");
                    let title = null;
                    const start = meta.indexOf("StreamTitle='");
                    if (start !== -1) {
                        const end = meta.indexOf("';", start + 13);
                        if (end !== -1) title = meta.slice(start + 13, end);
                    }
                    resolve(new Response(JSON.stringify({title}), {status: 200}));
                };

                res.on("error", (err) => {
                    res.destroy();
                    resolve(new Response(JSON.stringify({title: null, error: err.message}), {status: 500}));
                });
            }
        );

        req.on("error", (err) => {
            resolve(new Response(JSON.stringify({title: null, error: err.message}), {status: 500}));
        });

        // safety: timeout + destroy if nothing within 5s
        req.setTimeout(5000, () => req.destroy());
    });
}
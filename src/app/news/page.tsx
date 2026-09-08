import React from 'react'

type Video = {
    id: string
    title: string
    published: string
}

const CHANNEL_ID = 'UC3lwlk2Zs8yZHLtIlJeqOZg'
const NEW_THRESHOLD_DAYS = 7

async function fetchChannelVideos(channelId: string): Promise<Video[]> {
    try {
        const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
        const res = await fetch(feedUrl, {next: {revalidate: 600}})
        if (!res.ok) return []
        const xml = await res.text()

        const entryRe = /<entry>[\s\S]*?<\/entry>/g
        const entries = xml.match(entryRe) || []

        return entries.map((entry) => {
            const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)
            const titleMatch = entry.match(/<title>(.*?)<\/title>/)
            const pubMatch = entry.match(/<published>(.*?)<\/published>/)
            return {
                id: idMatch ? idMatch[1] ?? '' : '',
                title: titleMatch ? titleMatch[1] ?? 'Untitled' : 'Untitled',
                published: pubMatch ? pubMatch[1] ?? '' : '',
            }
        }).filter(v => v.id)
    } catch (e) {
        return []
    }
}

async function fetchOgImage(url: string): Promise<string | null> {
    try {
        const res = await fetch(url, {next: {revalidate: 3600}})
        if (!res.ok) return null
        const html = await res.text()
        const ogMatch = html.match(/<meta\s+(?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["'](.*?)["']\s*\/?>/i)
        if (ogMatch && ogMatch[1]) return ogMatch[1]
        const imgMatch = html.match(/<link\s+rel=["']image_src["']\s+href=["'](.*?)["']\s*\/?>/i)
        if (imgMatch && imgMatch[1]) return imgMatch[1]
        return null
    } catch (e) {
        return null
    }
}

async function fetchMaxPrepsSchedule(url: string): Promise<Array<{
    date?: string; name?: string; location?: string; result?: string; link?: string
}>> {
    try {
        const res = await fetch(url, {next: {revalidate: 3600}})
        if (!res.ok) return []
        const html = await res.text()

        // Try to find JSON-LD structured data
        const scriptRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
        let m
        const events: any[] = []
        while ((m = scriptRe.exec(html)) !== null) {
            try {
                const j = JSON.parse(m[1]!)
                if (Array.isArray(j)) {
                    j.forEach(item => events.push(item))
                } else {
                    events.push(j)
                }
            } catch (_) {
                // ignore
            }
        }

        const out: Array<{ date?: string; name?: string; location?: string; result?: string; link?: string }> = []
        for (const ev of events) {
            if (!ev) continue
            // Sports events or generic events
            if (ev['@type'] && (ev['@type'].toLowerCase().includes('sports') || ev['@type'].toLowerCase().includes('event'))) {
                const name = ev.name || ev.headline || ev.event || ev.description
                const date = ev.startDate || ev.datePublished || ev.date
                const location = ev.location && (ev.location.name || ev.location.address || '')
                out.push({date, name, location, link: ev.url || url})
            }
            // Some pages include an array under 'event' or 'events'
            if (ev.event && Array.isArray(ev.event)) {
                ev.event.forEach((e: any) => out.push({
                    date: e.startDate, name: e.name, location: e.location && e.location.name, link: e.url || url
                }))
            }
            if (ev.events && Array.isArray(ev.events)) {
                ev.events.forEach((e: any) => out.push({
                    date: e.startDate, name: e.name, location: e.location && e.location.name, link: e.url || url
                }))
            }
        }

        // If we found structured events, return them
        if (out.length > 0) return out.slice(0, 12)

        // Fallback: try to extract simple schedule rows from HTML (very permissive)
        const rows: Array<{ date?: string; name?: string; location?: string; result?: string; link?: string }> = []
        const rowRe = /<tr[\s\S]*?>([\s\S]*?)<\/tr>/gi
        let r
        while ((r = rowRe.exec(html)) !== null && rows.length < 12) {
            const tr = r[0]!
            const text = tr.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
            if (text.match(/vs|@|home|away|win|loss|def/gi)) {
                rows.push({name: text, link: url})
            }
        }
        return rows.slice(0, 12)
    } catch (e) {
        return []
    }
}

function isNew(published: string) {
    if (!published) return false
    const then = Date.parse(published)
    if (isNaN(then)) return false
    const ageMs = Date.now() - then
    return ageMs < NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000
}

export default async function Page() {
    const videos = await fetchChannelVideos(CHANNEL_ID)
    const sorted = videos.slice().sort((a, b) => {
        const da = Date.parse(a.published) || 0
        const db = Date.parse(b.published) || 0
        return db - da
    })
    const latest = sorted[0]
    const MAXPREPS_TEAM_URL = 'https://www.maxpreps.com/fl/sanford/crooms-academy-panthers/baseball/'
    const MAXPREPS_SCHEDULE_URL = 'https://www.maxpreps.com/fl/sanford/crooms-academy-panthers/baseball/schedule/'
    const teamOg = await fetchOgImage(MAXPREPS_TEAM_URL)
    const scheduleOg = await fetchOgImage(MAXPREPS_SCHEDULE_URL)
    const teamSchedule = await fetchMaxPrepsSchedule(MAXPREPS_TEAM_URL)
    const scheduleList = await fetchMaxPrepsSchedule(MAXPREPS_SCHEDULE_URL)

    return <main className='p-5'>
        <h1>School News</h1>
        {!latest ? <p>No videos found.</p> : <article key={latest.id} style={{border: '1px solid #ddd', padding: 12, borderRadius: 6}}>
            <div className='flex justify-between items-center mb-2'>
                <strong>{latest.title}</strong>
                {isNew(latest.published) && (<span style={{
                    background: '#e11', color: 'white', padding: '4px 8px', borderRadius: 4
                }}>New</span>)}
            </div>
            <div style={{position: 'relative', paddingTop: '56.25%'}}>
                <a href={`https://www.youtube.com/watch?v=${latest.id}`} target='_blank'
                   rel='noopener noreferrer' className='absolute top-0 left-0 w-full h-full'>
                    <img
                        src={`https://i.ytimg.com/vi/${latest.id}/maxresdefault.jpg`}
                        alt={latest.title}
                        style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                    }}>
                        <svg width='80' height='80' viewBox='0 0 100 100' fill='none'
                             xmlns='http://www.w3.org/2000/svg'>
                            <circle cx='50' cy='50' r='48' fill='rgba(0,0,0,0.6)'/>
                            <polygon points='40,35 70,50 40,65' fill='#fff'/>
                        </svg>
                    </div>
                </a>
            </div>
            <div style={{marginTop: 8, color: '#666', fontSize: 13}}>Published: {latest.published}</div>
        </article>}
        <section style={{marginTop: 24}}>
            <h2>Scores & Schedule</h2>
            <p style={{color: '#666', marginTop: 4}}>Team page and schedule (embedded from MaxPreps).</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginTop: 12}}>
                <div style={{border: '1px solid #ddd', padding: 12}}>
                    <h3 style={{marginTop: 0}}>Team Overview</h3>
                    {teamSchedule && teamSchedule.length > 0 ? (<ul style={{paddingLeft: 16, margin: 0}}>
                        {teamSchedule.map((s, i) => (<li key={`team-${i}`} style={{marginBottom: 6}}>
                            <a href={s.link || MAXPREPS_TEAM_URL} target='_blank'
                               rel='noopener noreferrer'>{s.date ? `${s.date} — ` : ''}{s.name || 'Game'}</a>
                            {s.location ? <span style={{color: '#666'}}> — {s.location}</span> : null}
                        </li>))}
                    </ul>) : teamOg ? (<a href={MAXPREPS_TEAM_URL} target='_blank' rel='noopener noreferrer'>
                        <img src={teamOg} alt='MaxPreps team'
                             style={{width: '100%', height: 'auto', display: 'block'}}/>
                    </a>) : (<a href={MAXPREPS_TEAM_URL} target='_blank' rel='noopener noreferrer'
                                style={{display: 'block', padding: 24, textAlign: 'center', color: '#666'}}>Open
                        Team Page</a>)}
                </div>
                <div style={{border: '1px solid #ddd', padding: 12}}>
                    <h3 style={{marginTop: 0}}>Schedule</h3>
                    {scheduleList && scheduleList.length > 0 ? (<ul style={{paddingLeft: 16, margin: 0}}>
                        {scheduleList.map((s, i) => (<li key={`sched-${i}`} style={{marginBottom: 6}}>
                            <a href={s.link || MAXPREPS_SCHEDULE_URL} target='_blank'
                               rel='noopener noreferrer'>{s.date ? `${s.date} — ` : ''}{s.name || 'Game'}</a>
                            {s.result ? <strong style={{marginLeft: 8}}>{s.result}</strong> : null}
                        </li>))}
                    </ul>) : scheduleOg ? (<a href={MAXPREPS_SCHEDULE_URL} target='_blank' rel='noopener noreferrer'>
                        <img src={scheduleOg} alt='MaxPreps schedule'
                             style={{width: '100%', height: 'auto', display: 'block'}}/>
                    </a>) : (<a href={MAXPREPS_SCHEDULE_URL} target='_blank' rel='noopener noreferrer'
                                style={{display: 'block', padding: 24, textAlign: 'center', color: '#666'}}>Open
                        Schedule</a>)}
                </div>
            </div>
        </section>
        <footer style={{marginTop: 32, borderTop: '1px solid #eee', paddingTop: 20}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start'}}>
                <div>
                    <h3 style={{margin: '0 0 8px 0'}}>Purchase Tickets</h3>
                    <p style={{marginTop: 0, color: '#666'}}>Buy tickets for upcoming games.</p>
                    <ul style={{paddingLeft: 16}}>
                        <li><a href='https://gofan.co/app/school/FL555' target='_blank' rel='noopener noreferrer'>School
                            Ticket Portal (GoFan)</a></li>
                    </ul>
                </div>
                <div>
                    <h3 style={{margin: '0 0 8px 0'}}>Misc</h3>
                    <p style={{marginTop: 0, color: '#666'}}>Miscellaneous links and resources.</p>
                    <ul style={{paddingLeft: 16}}>
                        <li><a href='https://www.cait.scps.k12.fl.us/forms-clearance' target='_blank'
                               rel='noopener noreferrer'>Athletic Clearance</a></li>
                        <li><a href='https://www.paypal.com/donate/?hosted_button_id=EY6KCVGMKDBNC' target='_blank'
                               rel='noopener noreferrer'>Donate</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </main>;
}

export default function AdsPage() {
    return <main className="flex items-center justify-center p-8">
        <div className="max-w-4xl w-full rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-4">
                Advertising with Crooms Bell Schedule
            </h1>

            <p className="mb-6 text-lg">
                Reach students, families, and visitors through a highly visible, community-focused platform.
            </p>

            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">
                    Why advertise with us?
                </h2>

                <ul className="mb-6 list-disc space-y-2 pl-5">
                    <li>High visibility on a trusted school and community scheduling website.</li>
                    <li>Placement in front of a consistent, engaged audience.</li>
                    <li>Simple, direct advertising opportunities for local businesses and partners.</li>
                </ul>

                <p className="mb-4">
                    Interested in partnering with us? Reach out to the Crooms Bell Schedule team to learn more about
                    available ad opportunities.
                </p>

                <a
                    href="https://www.croomsbellschedule.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                >
                    Back to the site
                </a>
            </div>
        </div>
    </main>;
}

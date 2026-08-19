export default function AdPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Advertising with Crooms Bell Schedule
        </h1>

        <p className="text-gray-700 mb-6 text-lg">
          Reach students, families, and visitors through a highly visible, community-focused platform.
        </p>

        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-900">
            Why advertise with us?
          </h2>

          <ul className="mb-6 list-disc space-y-2 pl-5 text-gray-700">
            <li>High visibility on a trusted school and community scheduling website.</li>
            <li>Placement in front of a consistent, engaged audience.</li>
            <li>Simple, direct advertising opportunities for local businesses and partners.</li>
          </ul>

          <p className="mb-4 text-gray-700">
            Interested in partnering with us? Reach out to the Crooms Bell Schedule team to learn more about available ad opportunities.
          </p>

          <a
            href="https://www.croomsbellschedule.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Back to the site
          </a>
        </div>
      </div>
    </main>
  );
}
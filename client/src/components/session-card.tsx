// Component for displaying the current session and creating a new one
export default function SessionCard() {
  // Get the session ID and patient FHIR ID from session storage
  const sid = sessionStorage.getItem('sid');
  const pfid = sessionStorage.getItem('pfid');
  return (
    <div className="mt-8 rounded-lg bg-white shadow-lg">
      <div className="px-4 py-5 sm:px-6">
        {!sid || !pfid ? (
          <div className="flex items-center justify-between">
            <p>Click the 'Connect a test medical record' button.</p>
            <button
              className="rounded-md bg-violet-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              onClick={redirectToSecureshare}>
              Connect a test medical record
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <ul className="space-y-2">
              <li>
                <span>Session ID: </span>
                <code>{sid}</code>
              </li>
              <li>
                <span>Patient FHIR ID: </span>
                <code>{pfid}</code>
              </li>
            </ul>
            <button
              className="rounded-md bg-violet-600 py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              onClick={destroySession}>
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Fetch the URL for Secureshare to create a session
async function redirectToSecureshare() {
  const { url } = await fetch('http://localhost:3000/secureshare').then((res) => res.json());
  window.location.href = url;
}

// Remove the session ID and patient FHIR ID from session storage and reload the page
function destroySession() {
  sessionStorage.removeItem('sid');
  sessionStorage.removeItem('pfid');
  window.location.reload();
}

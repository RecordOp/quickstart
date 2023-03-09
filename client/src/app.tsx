import { useEffect, useState } from 'react';
import PatientCard from './components/patient-card';
import SessionCard from './components/session-card';
import PractitionerCard from './components/practitioner-card';
import { Patient } from 'fhir/r4';
import OrganizationCard from './components/organization-card';

export default function App() {
  // Handle the redirect from Secureshare.
  useEffect(() => {
    // Get the query parameters.
    const searchParams = new URLSearchParams(window.location.search);
    const sid = searchParams.get('sid');
    const pfid = searchParams.get('pfid');
    // If we have a session ID and patient ID, store them in session storage and reload.
    if (sid && pfid) {
      sessionStorage.setItem('sid', sid);
      sessionStorage.setItem('pfid', pfid);
      window.location.href = '/';
    }
  }, []);
  // Get the session ID and patient FHIR ID from session storage.
  const sid = sessionStorage.getItem('sid');
  const pfid = sessionStorage.getItem('pfid');
  // State to hold the patient data.
  const [patientData, setPatientData] = useState<Patient>();
  // Render the app.
  return (
    <div className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Your Web App
        </h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SessionCard />
        {sid && pfid && (
          <PatientCard reference={`Patient/${pfid}`} onLoad={(data) => setPatientData(data)} />
        )}
        {patientData?.managingOrganization && (
          <OrganizationCard
            reference={patientData.managingOrganization.reference!}
            title="Managing Organization"
          />
        )}
        {patientData?.generalPractitioner?.map((generalPractitioner: any, i: number) => (
          <PractitionerCard
            key={i}
            reference={generalPractitioner.reference}
            title={`Practitioner #${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import { Bundle, MedicationRequest, Patient, Encounter } from 'fhir/r4';
import { useEffect, useState } from 'react';
import PatientCard from './components/patient-card';
import SessionCard from './components/session-card';
import PractitionerCard from './components/practitioner-card';
import OrganizationCard from './components/organization-card';
import MedicationRequestCard from './components/medication-request-card';
import useFhirQuery from './hooks/use-fhir-query';
import EncounterCard from './components/encounter-card';

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
  // Load medication requests
  const medicationRequests = useFhirQuery<Bundle<MedicationRequest>>(
    encodeURI(`MedicationRequest?patient=${pfid}`),
    { skip: !pfid }
  );

  const encounters = useFhirQuery<Bundle<Encounter>>(
    encodeURI(`Encounter?patient=${pfid}`),
    { skip: !pfid }
  );
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

        {/* Patient Demographics */}
        {sid && pfid && (
          <>
            <PatientCard query={`Patient/${pfid}`} onLoad={(data) => setPatientData(data)} />
          </>
        )}

        {/* Patient's Managing Organization */}
        {patientData?.managingOrganization && (
          <OrganizationCard
            query={patientData.managingOrganization.reference!}
            title="Managing Organization"
          />
        )}

        {/* Patient's Practitioner's */}
        {patientData?.generalPractitioner?.map((generalPractitioner: any, i: number) => (
          <PractitionerCard
            key={i}
            query={generalPractitioner.reference}
            title={`Practitioner #${i + 1}`}
          />
        ))}

        {/* Patient's Medications */}
        {medicationRequests.data?.entry
          ?.filter((entry) => entry.resource?.resourceType === 'MedicationRequest')
          ?.map((entry: any, i: number) => (
            <MedicationRequestCard key={i} title={`Medication #${i + 1}`} data={entry.resource} />
          ))}

        {/* Patient's Encounters */}
        {encounters.data?.entry
          ?.filter((entry) => entry.resource?.resourceType === 'Encounter')
          ?.map((entry: any, i: number) => (
            <EncounterCard key={i} title={`Encounter #${i + 1}`} data={entry.resource} />
          ))}
      </div>
    </div>
  );
}

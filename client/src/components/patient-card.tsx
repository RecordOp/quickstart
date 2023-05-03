import { Patient } from 'fhir/r4';
import DataList from './data-list';
import FhirCard, { FhirCardProps } from './fhir-card';

// Component to render a patient card
export default function PatientCard({ query, onLoad }: Omit<FhirCardProps<Patient>, 'title'>) {
  return (
    <FhirCard query={query} title="Patient" onLoad={onLoad}>
      {(data) => {
        // Extract the data.
        const name = data.name?.find((n) => n.use === 'official')?.text ?? 'Unknown';
        const birthDate = data.birthDate ?? 'Unknown';
        const gender = data.gender ?? 'Unknown';
        const maritalStatus = data.maritalStatus?.text ?? 'Unknown';
        const preferredLanguage =
          data.communication?.find((c) => c.preferred)?.language?.text ?? 'Unknown';
        const phoneNumber = data.telecom?.find((t) => t.system === 'phone')?.value ?? 'Unknown';
        const emailAddress = data.telecom?.find((t) => t.system === 'email')?.value ?? 'Unknown';
        const address = data.address?.find((a) => a.use === 'home');
        // Render the data.
        return (
          <DataList
            items={[
              { label: 'Name', content: name },
              { label: 'Birth Date', content: birthDate },
              {
                label: 'Gender',
                content: gender,
                overrides: { content: { className: 'capitalize' } },
              },
              { label: 'Marital Status', content: maritalStatus },
              { label: 'Preferred Language', content: preferredLanguage },
              { label: 'Phone Number', content: phoneNumber },
              { label: 'Email Address', content: emailAddress },
              {
                label: 'Address',
                content: address
                  ? [
                      address.line?.join(', '),
                      address.city,
                      address.state,
                      address.postalCode,
                    ].join(', ')
                  : 'Unknown',
              },
            ]}
          />
        );
      }}
    </FhirCard>
  );
}

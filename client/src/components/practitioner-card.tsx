import { Practitioner } from 'fhir/r4';
import DataList from './data-list';
import FhirCard, { FhirCardProps } from './fhir-card';

// Component to render a practitioner card
export default function PractitionerCard(props: FhirCardProps<Practitioner>) {
  return (
    <FhirCard {...props}>
      {(data) => {
        // Extract the data.
        const name = data.name?.[0]?.text ?? 'Unknown';
        const active = data.active ? 'True' : 'False';
        // Render the data.
        return (
          <DataList
            items={[
              { label: 'Name', content: name },
              { label: 'Active', content: active },
            ]}
          />
        );
      }}
    </FhirCard>
  );
}

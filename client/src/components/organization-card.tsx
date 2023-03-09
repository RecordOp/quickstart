import { Organization } from 'fhir/r4';
import DataList from './data-list';
import FhirCard, { FhirCardProps } from './fhir-card';

// Component to render an organization card
export default function OrganizationCard(props: FhirCardProps<Organization>) {
  return (
    <FhirCard {...props}>
      {(data) => {
        // Extract the data.
        const name = data.name ?? 'Unknown';
        const active = data.active ? 'True' : 'False';
        const address = data.address?.[0];
        // Render the data.
        return (
          <DataList
            items={[
              { label: 'Name', content: name },
              { label: 'Active', content: active },
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

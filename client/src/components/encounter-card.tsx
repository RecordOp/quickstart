import { Encounter } from 'fhir/r4';
import { ReactNode, useState } from 'react';
import DataList from './data-list';
import DropdownCard from './dropdown-card';

interface EncounterCardProps {
  data: Encounter;
  title: ReactNode;
}
// Component to render a medication request card
export default function EncounterCard({ data, title }: EncounterCardProps) {
  const [open, setOpen] = useState(false);
  const type = data.type?.[0].text ?? 'NONE';
  const periodStart = data.period?.start ?? 'NONE';
  const periodEnd = data.period?.end ?? 'NONE';
  const location = data.location?.[0].location?.display ?? 'NONE';
  return (
    <DropdownCard open={open} onClick={() => setOpen((prev) => !prev)} title={title}>
      <DataList
        items={[
			{ label: 'Type', content: type},
			{ label: 'Start', content: periodStart},
			{ label: 'End', content: periodEnd},
			{ label: 'Location', content: location}
        ]}
      />
    </DropdownCard>
  );
}

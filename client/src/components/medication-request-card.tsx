import { Bundle, MedicationRequest } from 'fhir/r4';
import { ReactNode, useState } from 'react';
import DataList from './data-list';
import DropdownCard from './dropdown-card';

interface MedicationRequestCardProps {
  data: MedicationRequest;
  title: ReactNode;
}
// Component to render a medication request card
export default function MedicationRequestCard({ data, title }: MedicationRequestCardProps) {
  const [open, setOpen] = useState(false);
  const name = data.medicationReference?.display ?? 'NONE';
  const authoredOn = data.authoredOn ?? 'NONE';
  const reason = data.reasonCode?.[0].text ?? 'NONE';
  const dosage = data.dosageInstruction?.[0].text ?? 'NONE';
  return (
    <DropdownCard open={open} onClick={() => setOpen((prev) => !prev)} title={title}>
      <DataList
        items={[
          { label: 'Name', content: name },
          { label: 'Authored On', content: authoredOn },
          { label: 'Reason', content: reason },
          { label: 'Dosage', content: dosage },
        ]}
      />
    </DropdownCard>
  );
}

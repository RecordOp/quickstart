import { useEffect, useState } from 'react';
import useFhirQuery from '../hooks/use-fhir-query';
import DropdownCard from './dropdown-card';

export interface FhirCardProps<T> {
  query: string; // The FHIR query to fetch
  title: string; // The title of the card
  onLoad?: (data: T) => void; // A callback to call when the data has loaded
}
// Component to render contents with data from a FHIR query
export default function FhirQueryCard<T>({
  query,
  title,
  onLoad,
  children,
}: FhirCardProps<T> & {
  children: (data: T) => JSX.Element;
}) {
  // Disclosure state
  const [open, setOpen] = useState(false);
  // Fetch the FHIR data once the card is open
  const { data, error, loading } = useFhirQuery<T>(query, { skip: !open });
  // If the data has loaded, call the onLoad callback
  useEffect(() => {
    if (data && onLoad) {
      onLoad(data);
    }
  }, [data]);
  // Render the card
  return (
    <DropdownCard open={open} onClick={() => setOpen((prev) => !prev)} title={title}>
      {loading && <p className="px-4 py-5 text-gray-600 sm:px-6">Loading...</p>}
      {error && <p className="px-4 py-5 text-red-600 sm:px-6">Failed to load data: {error}</p>}
      {!loading && !error && data && children(data)}
    </DropdownCard>
  );
}

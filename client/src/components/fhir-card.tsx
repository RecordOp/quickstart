import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Disclosure, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import useFetch from '../hooks/use-fetch';

export interface FhirCardProps<T> {
  reference: string; // The FHIR reference to fetch
  title: string; // The title of the card
  onLoad?: (data: T) => void; // A callback to call when the data has loaded
}
// Component to render a FHIR card with data from a FHIR reference
export default function FhirCard<T>({
  reference,
  title,
  onLoad,
  children,
}: FhirCardProps<T> & {
  children: (data: T) => JSX.Element;
}) {
  const sid = sessionStorage.getItem('sid');
  // Disclosure state
  const [open, setOpen] = useState(false);
  // Fetch the FHIR data once the card is open
  const { data, error, loading } = useFetch<T>(
    new URL(`/fhir?query=${reference}&sid=${sid}`, import.meta.env.VITE_SERVER_URL),
    undefined,
    { skip: !open }
  );
  // If the token is invalid, remove it from session storage and reload the page
  if ((data as any)?.issue?.[0]?.diagnostics?.includes('invalid_token')) {
    sessionStorage.removeItem('sid');
    sessionStorage.removeItem('pfid');
    window.location.reload();
  }
  // If the data has loaded, call the onLoad callback
  useEffect(() => {
    if (data && onLoad) {
      onLoad(data);
    }
  }, [data]);
  // Render the card
  return (
    <div className="mt-8 rounded-lg bg-white shadow-lg">
      <Disclosure>
        <Disclosure.Button
          className={twMerge(
            'flex w-full items-center justify-between border-gray-200 px-4 py-5 sm:px-6',
            'border-b'
          )}
          onClick={() => setOpen((prev) => !prev)}>
          <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
          <ChevronRightIcon className={twMerge('h-6 w-6 text-gray-400', open && 'rotate-90')} />
        </Disclosure.Button>
        <Transition
          show={open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0">
          <Disclosure.Panel static>
            {loading && <p className="px-4 py-5 text-gray-600 sm:px-6">Loading...</p>}
            {error && (
              <p className="px-4 py-5 text-red-600 sm:px-6">Failed to load data: {error}</p>
            )}
            {!loading && !error && data && children(data)}
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
    </div>
  );
}

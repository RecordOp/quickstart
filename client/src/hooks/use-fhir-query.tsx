import useFetch, { UseFetchOptions } from './use-fetch';

export default function useFhirQuery<T>(query: string, options?: UseFetchOptions) {
  const sid = sessionStorage.getItem('sid');
  const { data, error, loading } = useFetch<T>(
    new URL('/fhir', import.meta.env.VITE_SERVER_URL),
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, sid }),
    },
    options
  );

  // If the token is invalid, remove it from session storage and reload the page
  if ((data as any)?.issue?.[0]?.diagnostics?.includes('invalid_token')) {
    sessionStorage.removeItem('sid');
    sessionStorage.removeItem('pfid');
    window.location.reload();
  }
  return { data, error, loading };
}

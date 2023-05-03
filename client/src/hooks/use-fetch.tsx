import { useEffect, useState } from 'react';

export interface UseFetchOptions {
  skip?: boolean;
}

// useFetch is a custom hook that wraps the fetch API.
export default function useFetch<Data = any, Error = any>(
  input: RequestInfo | URL,
  init: RequestInit | undefined = undefined,
  options: UseFetchOptions = { skip: false }
) {
  // Fetch state
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const abort = new AbortController();
    // Fetch data if not skipped
    if (!options.skip) {
      setLoading(true);
      fetch(input, Object.assign(init ?? {}, { signal: abort.signal }))
        .then((res) => res.json())
        .then((json) => {
          if (active) setData(json);
        })
        .catch((error) => {
          if (active && !abort.signal.aborted) setError(error);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }
    // Abort fetch if the component unmounts
    return () => {
      active = false;
      abort.abort();
    };
  }, [options.skip]);
  // Return the fetch state
  return { data, error, loading };
}

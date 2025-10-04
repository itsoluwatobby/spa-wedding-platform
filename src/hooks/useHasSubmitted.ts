import { useEffect, useState } from "react";
import { getDeviceFingerprint } from "../utils/helpers";

const initState = {
  data: {} as SuccessResponse['data'],
  hasSubmitted: false,
  isLoading: false,
  reload: 0,
  error: null,
};

export const useHasSubmitted = () => {
  const [appState, setAppState] = useState(initState);

  const { data, hasSubmitted, isLoading, reload } = appState;

  const refetch = () => setAppState((prev) => ({ ...prev, reload: prev.reload + 1 }));

  useEffect(() => {
    (async () => {
      setAppState((prev) => ({ ...prev, isLoading: true }));
      try {
        const fingerprint = getDeviceFingerprint();
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/submission/${fingerprint}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        const data = await res.json() as SuccessResponse;
        if (data.data) {
          setAppState((prev) => (
            {
              ...prev,
              data: data.data,
              hasSubmitted: true,
            }
          ));
        }
      } catch(err: any) {
        console.log(err.message);
        setAppState((prev) => ({ ...prev, error: err.message }));
      } finally {
        setAppState((prev) => ({ ...prev, isLoading: false }));
      }
    })();
  }, [reload]);

  return { data, hasSubmitted, isLoading, refetch };
}
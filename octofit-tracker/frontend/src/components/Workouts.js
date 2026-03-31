import { useCallback } from 'react';
import ApiResourcePage from './ApiResourcePage';

function Workouts() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const handleEndpointResolved = useCallback((resolvedEndpoint) => {
    console.log('[Workouts] Component endpoint:', resolvedEndpoint);
  }, []);

  const handleDataLoaded = useCallback((payload, normalizedData) => {
    console.log('[Workouts] Component raw fetched data:', payload);
    console.log('[Workouts] Component normalized data:', normalizedData);
  }, []);

  return (
    <ApiResourcePage
      title="Workouts"
      resourcePath="workouts"
      endpointOverride={endpoint}
      onEndpointResolved={handleEndpointResolved}
      onDataLoaded={handleDataLoaded}
      emptyMessage="No workouts found."
    />
  );
}

export default Workouts;

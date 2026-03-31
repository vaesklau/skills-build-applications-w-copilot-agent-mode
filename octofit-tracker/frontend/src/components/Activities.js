import { useCallback } from 'react';
import ApiResourcePage from './ApiResourcePage';

function Activities() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const handleEndpointResolved = useCallback((resolvedEndpoint) => {
    console.log('[Activities] Component endpoint:', resolvedEndpoint);
  }, []);

  const handleDataLoaded = useCallback((payload, normalizedData) => {
    console.log('[Activities] Component raw fetched data:', payload);
    console.log('[Activities] Component normalized data:', normalizedData);
  }, []);

  return (
    <ApiResourcePage
      title="Activities"
      resourcePath="activities"
      endpointOverride={endpoint}
      onEndpointResolved={handleEndpointResolved}
      onDataLoaded={handleDataLoaded}
      emptyMessage="No activity records found."
    />
  );
}

export default Activities;

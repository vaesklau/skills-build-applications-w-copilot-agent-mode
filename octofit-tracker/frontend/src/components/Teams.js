import { useCallback } from 'react';
import ApiResourcePage from './ApiResourcePage';

function Teams() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const handleEndpointResolved = useCallback((resolvedEndpoint) => {
    console.log('[Teams] Component endpoint:', resolvedEndpoint);
  }, []);

  const handleDataLoaded = useCallback((payload, normalizedData) => {
    console.log('[Teams] Component raw fetched data:', payload);
    console.log('[Teams] Component normalized data:', normalizedData);
  }, []);

  return (
    <ApiResourcePage
      title="Teams"
      resourcePath="teams"
      endpointOverride={endpoint}
      onEndpointResolved={handleEndpointResolved}
      onDataLoaded={handleDataLoaded}
      emptyMessage="No teams found."
    />
  );
}

export default Teams;

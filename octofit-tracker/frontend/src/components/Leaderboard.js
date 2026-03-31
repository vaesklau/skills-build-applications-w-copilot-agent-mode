import { useCallback } from 'react';
import ApiResourcePage from './ApiResourcePage';

function Leaderboard() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  const handleEndpointResolved = useCallback((resolvedEndpoint) => {
    console.log('[Leaderboard] Component endpoint:', resolvedEndpoint);
  }, []);

  const handleDataLoaded = useCallback((payload, normalizedData) => {
    console.log('[Leaderboard] Component raw fetched data:', payload);
    console.log('[Leaderboard] Component normalized data:', normalizedData);
  }, []);

  return (
    <ApiResourcePage
      title="Leaderboard"
      resourcePath="leaderboard"
      endpointOverride={endpoint}
      onEndpointResolved={handleEndpointResolved}
      onDataLoaded={handleDataLoaded}
      emptyMessage="No leaderboard entries found."
    />
  );
}

export default Leaderboard;

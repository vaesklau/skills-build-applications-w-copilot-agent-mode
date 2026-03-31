import { useCallback } from 'react';
import ApiResourcePage from './ApiResourcePage';

function Users() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const handleEndpointResolved = useCallback((resolvedEndpoint) => {
    console.log('[Users] Component endpoint:', resolvedEndpoint);
  }, []);

  const handleDataLoaded = useCallback((payload, normalizedData) => {
    console.log('[Users] Component raw fetched data:', payload);
    console.log('[Users] Component normalized data:', normalizedData);
  }, []);

  return (
    <ApiResourcePage
      title="Users"
      resourcePath="users"
      endpointOverride={endpoint}
      onEndpointResolved={handleEndpointResolved}
      onDataLoaded={handleDataLoaded}
      emptyMessage="No users found."
    />
  );
}

export default Users;

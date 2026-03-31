import { useCallback, useEffect, useMemo, useState } from 'react';

function ApiResourcePage({ title, resourcePath, emptyMessage }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = codespaceName ? 'https' : 'http';
  const host = codespaceName
    ? `${codespaceName}-8000.app.github.dev`
    : 'localhost:8000';
  const endpoint = `${protocol}://${host}/api/${resourcePath}/`;

  const fetchItems = useCallback(async () => {
    console.log(`[${title}] REST API endpoint:`, endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      console.log(`[${title}] Raw fetched data:`, payload);

      const normalizedData = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : [];

      console.log(`[${title}] Normalized data:`, normalizedData);
      setItems(normalizedData);
      setError('');
    } catch (fetchError) {
      console.error(`[${title}] Fetch error:`, fetchError);
      setError(fetchError.message);
      setItems([]);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return items;
    }

    return items.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(trimmed)
    );
  }, [items, query]);

  const columns = useMemo(() => {
    if (filteredItems.length === 0) {
      return [];
    }

    return Object.keys(filteredItems[0]).slice(0, 6);
  }, [filteredItems]);

  return (
    <section className="container py-4">
      <div className="card shadow-sm mb-4 border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h2 className="h3 mb-1 text-primary-emphasis">{title}</h2>
              <p className="text-secondary mb-0">
                Data source:{' '}
                <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
                  {endpoint}
                </a>
              </p>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-primary" onClick={fetchItems}>
                Refresh {title}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setQuery('')}>
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <form className="row g-3 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-md-8">
              <label htmlFor={`${resourcePath}-search`} className="form-label fw-semibold">
                Search {title}
              </label>
              <input
                id={`${resourcePath}-search`}
                type="text"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()} by any value`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => {
                  if (filteredItems.length > 0) {
                    setSelectedItem(filteredItems[0]);
                  }
                }}
                disabled={filteredItems.length === 0}
              >
                Open First Row Modal
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger">Unable to load {title.toLowerCase()}: {error}</div>}

          {!error && filteredItems.length === 0 && <p className="mb-0 text-muted">{emptyMessage}</p>}

          {!error && filteredItems.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    {columns.map((column) => (
                      <th key={column} scope="col" className="text-capitalize">
                        {column.replace(/_/g, ' ')}
                      </th>
                    ))}
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
                    <tr key={item.id || item._id || index}>
                      {columns.map((column) => (
                        <td key={`${item.id || item._id || index}-${column}`}>
                          {typeof item[column] === 'object'
                            ? JSON.stringify(item[column])
                            : String(item[column] ?? '')}
                        </td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          onClick={() => setSelectedItem(item)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      )}
    </section>
  );
}

export default ApiResourcePage;

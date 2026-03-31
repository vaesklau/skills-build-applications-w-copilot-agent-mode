import ApiResourcePage from './ApiResourcePage';

function Activities() {
  return (
    <ApiResourcePage
      title="Activities"
      resourcePath="activities"
      emptyMessage="No activity records found."
    />
  );
}

export default Activities;

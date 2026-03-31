import ApiResourcePage from './ApiResourcePage';

function Leaderboard() {
  return (
    <ApiResourcePage
      title="Leaderboard"
      resourcePath="leaderboard"
      emptyMessage="No leaderboard entries found."
    />
  );
}

export default Leaderboard;

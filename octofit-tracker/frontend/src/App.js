import { useEffect } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = codespaceName ? 'https' : 'http';
  const host = codespaceName
    ? `${codespaceName}-8000.app.github.dev`
    : 'localhost:8000';
  const apiBaseUrl = `${protocol}://${host}/api`;
  const logoUrl = `${process.env.PUBLIC_URL}/octofitapp-small.png`;

  useEffect(() => {
    console.log('[App] Navigation active. API base URL:', apiBaseUrl);
  }, [apiBaseUrl]);

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg app-navbar shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/users">
            <img src={logoUrl} alt="OctoFit logo" className="octofit-logo" />
            <span className="fw-semibold">OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="container pt-4">
        <div className="card border-0 shadow-sm app-hero-card">
          <div className="card-body p-4">
            <h1 className="display-6 fw-bold mb-2 app-heading">OctoFit Tracker Dashboard</h1>
            <p className="app-body-text mb-0">
              Review users, activities, teams, leaderboard, and workouts from the Django REST API.{' '}
              <a
                className="app-link"
                href="https://www.django-rest-framework.org/"
                target="_blank"
                rel="noreferrer"
              >
                Django REST Framework docs
              </a>
            </p>
          </div>
        </div>
      </header>

      <main className="pb-5">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

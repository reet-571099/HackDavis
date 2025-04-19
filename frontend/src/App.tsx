import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Spin from "./pages/Spin";
import Deed from "./pages/Deed";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";

const App = () => {
  const location = useLocation();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<Loading fullScreen />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/spin"
              element={
                <ProtectedRoute>
                  <Spin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deed"
              element={
                <ProtectedRoute>
                  <Deed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;

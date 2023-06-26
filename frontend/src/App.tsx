import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import useToken from "./hooks/useToken";
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Game from "./pages/Game";

type Children = {
  children: any,
}

export default function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/home"
              element={
                <ProtectedRouteGuard>
                  <Home />
                </ProtectedRouteGuard>
              }
            />
            <Route
              path="/games/:id"
              element={
                <ProtectedRouteGuard>
                  <Game />
                </ProtectedRouteGuard>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

function ProtectedRouteGuard({ children }: Children) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
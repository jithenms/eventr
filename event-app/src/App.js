import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Leaderboard from './pages/Leaderboard';
import Register from './pages/Register';
import Login from './pages/Login';
import NewEvent from './pages/NewEvent';
import NewPrize from './pages/NewPrize';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { AuthProvider, useAuth } from './auth/AuthContext';
import PrivateRoute from './components/layout/PrivateRoute';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import YourEventsRoute from './components/layout/YourEventsRoute';
import StudentRequests from './pages/StudentRequests';
import HelpPage from './pages/HelpPage';
import Prizes from './pages/Prizes';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
    credentials: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
});

function App() {
    return (
      <ApolloProvider client={client}>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              }
            />
            <Route path="/your-events" element={<YourEventsRoute />} />
            <Route
              path="/new-event"
              element={
                <PrivateRoute>
                  <NewEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests/:id"
              element={
                <PrivateRoute>
                  <StudentRequests />
                </PrivateRoute>
              }
            />
              <Route
                path="/prizes"
                element={
                  <PrivateRoute>
                    <Prizes />
                  </PrivateRoute>
                }
              />
            <Route
              path="/new-prize"
              element={
                <PrivateRoute>
                  <NewPrize />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/register-student" element={<RegisterStudent />} />
            <Route path="/register-teacher" element={<RegisterTeacher />} />
          </Routes>
        </AuthProvider>
      </ApolloProvider>
    );
}

export default App;

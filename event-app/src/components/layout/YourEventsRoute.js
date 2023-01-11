import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import TeacherYourEvents from '../../pages/TeacherYourEvents';
import YourEvents from '../../pages/YourEvents';
import Layout from './Layout';

const YourEventsRoute = () => {
  // destructures 'role' and 'currentUser' from the 'useAuth' hook
  const { role, currentUser } = useAuth();

  // If there is no current user it redirects user to the '/login' route using 'Navigate' component
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If the user is a 'student' it returns the Layout component with the students' events else the teachers' events
  if (role === "student") {
    return (
      <Layout>
        <YourEvents />
      </Layout>
    );
  } else if (role === "teacher") {
    return (
      <Layout>
        <TeacherYourEvents />
      </Layout>
    );
  }
};

export default YourEventsRoute;

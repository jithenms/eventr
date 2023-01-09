import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import TeacherYourEvents from '../../pages/TeacherYourEvents';
import YourEvents from '../../pages/YourEvents';
import Layout from './Layout';

const YourEventsRoute = () => {
	const { role, currentUser } = useAuth();
	console.log(role);

	if (!currentUser) {
		return <Navigate to='/login' />;
	}

	if (role === 'student') {
		return (
			<Layout>
				<YourEvents />
			</Layout>
		);
	} else if (role === 'teacher') {
		return (
			<Layout>
				<TeacherYourEvents />
			</Layout>
		);
	}
};

export default YourEventsRoute;

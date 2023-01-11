import { useQuery } from '@apollo/client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';
import { useAuth } from '../auth/AuthContext';
import TeacherEventCard from '../components/your-events/TeacherEventCard';
import { TEACHER_EVENTS } from '../graphql/queries';

// displays a list of events that a teacher has created and allows them to view the student requests and approved students for each event.
function TeacherYourEvents() {
  // uses the useAuth hook to access the current user's profile information, such as their first and last name, email, and school code.
  const { profile } = useAuth();

  /* 
    uses the useQuery hook from the @apollo/client library to make a GraphQL query to retrieve the events created by the current user. 
    The TEACHER_EVENTS query takes in the TeacherId as a variable, which is obtained from the current user's profile.
  */
  const { data, loading, error } = useQuery(TEACHER_EVENTS, {
    variables: {
      TeacherId: profile?.id,
    },
  });

  if (data) console.log(data?.teacherEvents);
  if (error) console.log(error);

  //   The component displays the current user's name, email, school code, and the number of events they have created using the data retrieved from the query.
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16">
            <img
              className="object-cover w-full h-full rounded-full"
              // src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              src={`https://avatar.oxro.io/avatar.svg?name=${profile?.firstName?.toUpperCase()}+${profile?.lastName?.toUpperCase()}`}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-2xl">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p>
              {profile?.email} - Teacher, {data?.teacherEvents?.length} events
            </p>
            <p className="text-gray-600 text-md">
              School code - @{profile?.school?.code}
            </p>
          </div>
        </div>
      </div>
      {/* 
        renders a table with a list of events that the user has created, using the TeacherEventCard component to display the details for each event. 
        The table includes columns for the event title, event date, number of student requests, number of approved students, and a button to view the student list for each event.
      */}
      <div className="w-11/12 mt-16">
        <TableContainer className="bg-white border rounded-lg">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <p className="text-indigo-600">
                    <b>Event Title</b>
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-indigo-600">
                    <b>Event Date</b>
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-indigo-600">
                    <b>Student Requests</b>
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-indigo-600">
                    <b>Approved Students</b>
                  </p>
                </TableCell>
                <TableCell align="right">
                  <p className="text-indigo-600">
                    <b>View Student List</b>
                  </p>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.teacherEvents?.map((event) => (
                <TeacherEventCard event={event} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default TeacherYourEvents;

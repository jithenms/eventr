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

function TeacherYourEvents() {
    const { profile } = useAuth();

    const { data, loading, error } = useQuery(TEACHER_EVENTS, {
        variables: {
            TeacherId: profile?.id,
        },
    });

    if (data) console.log(data?.teacherEvents);

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
                        <p className="text-gray-600 text-md">
                            School code - @{profile?.school?.code}
                        </p>
                        <p className="text-gray-600 text-md">
                            Teacher - {data?.teacherEvents?.length} events
                        </p>
                    </div>
                </div>
            </div>
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

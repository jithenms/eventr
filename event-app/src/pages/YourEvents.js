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
import UpcomingEventCard from '../components/your-events/UpcomingEventCard';
import { STUDENT_PARTICIPATION } from '../graphql/queries';

function YourEvents() {
    const { profile } = useAuth();

    const { data, loading, error } = useQuery(STUDENT_PARTICIPATION, {
        variables: {
            StudentId: profile?.id,
        },
    });

    return (
        <div className="py-8 px-4 mt-10 flex flex-col items-center">
            {/* <h3 class="mt-2 text-3xl sm:text-4xl leading-normal tracking-tight text-gray-900 font-bold">
                    Profile
                </h3> */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                    <div className="h-20 w-20">
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
                            {profile?.email} - Student, Grade {profile?.grade}
                        </p>
                        <p className="text-gray-600 text-md">
                            School code - @{profile?.school?.code}
                        </p>
                    </div>
                </div>
            </div>
            {/* <div className="w-11/12 flex flex-col items-center">
                <h3 class="mt-12 text-2xl">Prizes</h3>
                <div className="mt-4 w-full">
                    <TableContainer className="bg-white border rounded-lg">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <colgroup>
                                <col style={{ width: '28%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '28%' }} />
                            </colgroup>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <p className="text-indigo-600">
                                            <b>Prize Title</b>
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-indigo-600">
                                            <b>Reason</b>
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-indigo-600">
                                            <b>Awarded By</b>
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-indigo-600">
                                            <b>Quarter Awarded</b>
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <p className="text-indigo-600">
                                            <b>Date Awarded</b>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                 {data?.getStudent?.joinedEvents?.map(
                                    (event) => (
                                        <PrizeRow event={event} />
                                    ),
                                )} 
                                <PrizeRow />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div> */}
            <h1 class="mt-12 text-2xl">Event History</h1>
            <h2>Total points: {profile?.points}</h2>
            <div className="w-11/12 flex flex-col items-center">
                <div className="mt-4 w-full">
                    <TableContainer className="bg-white border rounded-lg">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <colgroup>
                                <col style={{ width: '28%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '16%' }} />
                                <col style={{ width: '28%' }} />
                            </colgroup>
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
                                            <b>Teacher Name</b>
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p className="text-indigo-600">
                                            <b>Event Points</b>
                                        </p>
                                    </TableCell>
                                    <TableCell align="right">
                                        <p className="text-indigo-600">
                                            <b>Attendance Status</b>
                                        </p>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.studentParticipation?.map(
                                    (participation) => (
                                        <UpcomingEventCard
                                            participation={participation}
                                        />
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default YourEvents;

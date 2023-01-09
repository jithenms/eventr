import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import StudentRequest from '../components/your-events/StudentRequest';

import { GET_EVENT } from '../graphql/queries';

function StudentRequests() {
    let { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT, {
        fetchPolicy: 'network-only',
        variables: {
            EventId: id,
        },
    });
    if (error) console.log(error);

    return (
        data && (
            <div className="flex justify-center h-screen">
                <div className="w-9/12">
                    <div className="flex flex-col items-center">
                        <h4 className="text-3xl mt-6">
                            Requests for {data?.event?.title}
                        </h4>
                        <p className="mt-2 text-gray-700 mb-4 text-center">
                            Below are students who have signed up for the event.
                            They will be awarded points if they attended the
                            event. Otherwise, the event will be removed from
                            their history.
                        </p>
                    </div>
                    {/* TODO: Make profiles! */}
                    <div className="flex items-start justify-between mt-8">
                        <div className="bg-white flex flex-col items-center border rounded-lg px-4 py-4">
                            <h2 className="text-xl">Student Requests</h2>
                            {data?.event?.participations?.map(
                                (participation) => {
                                    if (participation.status === 'JOINED')
                                        return (
                                            <StudentRequest
                                                participation={participation}
                                                eventId={id}
                                            />
                                        );
                                },
                            )}
                        </div>
                        <div className="bg-white flex flex-col items-center border rounded-lg px-4 py-4">
                            <p>Students Accepted</p>
                            {data?.event?.participations?.map(
                                (participation) => {
                                    if (participation.status === 'ACCEPTED')
                                        return (
                                            <StudentRequest
                                                participation={participation}
                                                eventId={id}
                                                accepted={true}
                                            />
                                        );
                                },
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default StudentRequests;

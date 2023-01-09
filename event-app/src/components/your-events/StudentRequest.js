import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { GET_STUDENT } from '../../graphql/queries';
import { ACCEPT_USER, LEAVE_EVENT } from '../../graphql/mutations';

function StudentRequest(props) {
    const { participation, accepted } = props;
    const { eventId } = props;

    const { loading, error, data } = useQuery(GET_STUDENT, {
        fetchPolicy: 'network-only',
        variables: {
            StudentId: participation?.studentId,
        },
    });

    console.log(data?.student);

    const [acceptEventRequest] = useMutation(ACCEPT_USER);
    const [leaveEvent] = useMutation(LEAVE_EVENT);

    const handleAccept = () => {
        acceptEventRequest({
            variables: {
                EventId: eventId,
                StudentId: data?.student?.id,
            },
            refetchQueries: ['event'],
        });
    };

    const handleDeny = () => {
        leaveEvent({
            variables: {
                EventId: eventId,
                StudentId: data?.student?.id,
            },
            refetchQueries: ['event'],
        });
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12">
                    <img
                        className="object-cover w-full h-full rounded-full"
                        // src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                        src={`https://avatar.oxro.io/avatar.svg?name=${data?.student?.firstName?.toUpperCase()}+${data?.student?.lastName.toUpperCase()}`}
                    />
                </div>
                <div className="flex flex-col">
                    <p>
                        {data?.student?.firstName} {data?.student?.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                        Grade {data?.student?.grade}
                    </p>
                </div>
            </div>
            <div className="flex ml-4">
                {!accepted && (
                    <button
                        className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600 hover:bg-indigo-800"
                        onClick={handleAccept}
                    >
                        Attended
                    </button>
                )}
                <button
                    className="p-2 lg:px-4 md:mx-2 text-gray-600 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={handleDeny}
                >
                    {!accepted ? 'Did Not Attend' : 'Remove'}
                </button>
            </div>
        </div>
    );
}

export default StudentRequest;

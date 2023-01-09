import { useMutation } from '@apollo/client';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    HiOutlineCalendar,
    HiOutlineClock,
    HiUserAdd,
    HiCheck,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { JOIN_EVENT, LEAVE_EVENT } from '../../graphql/mutations';

function EventCard(props) {
    const [checked, setChecked] = useState(false);

    const { profile, role } = useAuth();

    console.log(role);

    const [joinEvent, { data, loading, error }] = useMutation(JOIN_EVENT);
    const [leaveEvent, { leaveData, leaveLoading, leaveError }] =
        useMutation(LEAVE_EVENT);

    useEffect(() => {
        for (var i = 0; i < props?.event?.participations.length; i++) {
            if (props?.event?.participations[i]?.studentId === profile?.id) {
                setChecked(true);
                break;
            }
        }
    }, []);

    const handleSignUp = () => {
        joinEvent({
            variables: {
                EventId: props?.event?.id,
                StudentId: profile?.id,
            },
            refetchQueries: ['schoolEvents'],
        });
        setChecked(true);
    };

    const handleLeaveEvent = () => {
        leaveEvent({
            variables: {
                EventId: props?.event?.id,
                StudentId: profile?.id,
            },
            refetchQueries: ['schoolEvents'],
        });
        setChecked(false);
    };

    return (
        <div className="shadow flex flex-col items-start bg-white py-12 px-10 w-full rounded-2xl">
            <h1 className="text-3xl font-bold">{props?.event?.title}</h1>
            <div className="flex mt-7 items-center justify-between w-full">
                <div className="flex items-center">
                    {/* event owner avatar */}
                    <div className="h-12 w-12">
                        <img
                            className="object-cover w-full h-full rounded-lg"
                            // src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
                            src={`https://avatar.oxro.io/avatar.svg?name=${props?.event?.teacher.firstName?.toUpperCase()}+${props.event.teacher.lastName.toUpperCase()}`}
                        />
                    </div>
                    {/* event owner name + time posted */}
                    <div className="flex flex-col items-start ml-4">
                        {/* <p>Elizabeth May</p> */}
                        <p>
                            {props?.event?.teacher?.firstName}{' '}
                            {props?.event?.teacher.lastName}
                        </p>
                        {/* <p className="text-gray-500">6h ago</p> */}
                        <p className="text-gray-500">
                            {moment(props?.event?.createdAt).fromNow()}
                        </p>
                    </div>
                </div>
                {/* rightside tags */}
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 shadow rounded-lg px-4 py-2">
                        {/* <p>03-02-22</p> */}
                        <p>{props?.event?.date.substring(0, 10)}</p>
                        <HiOutlineCalendar />
                    </div>
                    <div className="flex items-center gap-2 shadow rounded-lg px-4 py-2">
                        {/* <p>4:30 PM</p> */}
                        <p>
                            {moment(`${props?.event?.time} PM`, [
                                'HH:mm',
                            ]).format('hh:mm A')}
                        </p>
                        <HiOutlineClock />
                    </div>
                    <div className="flex text-indigo-600 bg-indigo-50 border-indigo-600 border items-center gap-2 shadow rounded-lg px-4 py-2">
                        {/* <p>5 points</p> */}
                        <p>{props?.event?.points} points</p>
                    </div>
                </div>
            </div>
            {/* description */}
            <div className="mt-6">
                <p className="text-left">{props?.event?.description}</p>
            </div>
            {/* Sign up buttons */}
            <div className="mt-6 flex w-full items-center justify-between">
                {role == 'student' ? (
                    checked ? (
                        <button
                            className="flex bg-indigo-600 hover:bg-gray-700 text-white hover:border-gray-300 transition-colors duration-300 border border-gray-200 items-center px-3.5 py-1.5 gap-3 rounded-lg"
                            onClick={handleLeaveEvent}
                        >
                            <HiCheck className="text-gray-300" size={25} />
                            <p className="text-white">Signed Up</p>
                        </button>
                    ) : (
                        <button
                            className="flex bg-[#f9f9f9] hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300 border border-gray-200 items-center px-3.5 py-1.5 gap-3 rounded-lg"
                            onClick={handleSignUp}
                        >
                            <HiUserAdd className="text-gray-300" size={25} />
                            <p className="text-gray-700">Sign Up</p>
                        </button>
                    )
                ) : (
                    <Link to={`/requests/${props?.event?.id}`}>
                        <button className="flex bg-[#f9f9f9] hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300 border border-gray-200 items-center px-3.5 py-1.5 gap-3 rounded-lg">
                            <p className="text-gray-700">View Student List</p>
                        </button>
                    </Link>
                )}
                <p className="text-gray-500">
                    {props?.event?.participations?.length} Signed Up
                </p>
            </div>
        </div>
    );
}

export default EventCard;

import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import React, { useState } from 'react';
import {
    HiOutlineCalendar,
    HiOutlineClock,
    HiUserAdd,
    HiCheck,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { JOIN_EVENT, LEAVE_EVENT } from '../../graphql/mutations';
import { EVENT_PARTICIPATION } from '../../graphql/queries';

function EventCard(props) {
  const [checked, setChecked] = useState(false);

  // uses the "useAuth" hook from an external context to get information about the currently logged in user.
  const { profile, role } = useAuth();

  // uses the useMutation and useQuery hooks from the Apollo Client library to interact with the backend GraphQL API.
  const [joinEvent] = useMutation(JOIN_EVENT);
  const [leaveEvent] = useMutation(LEAVE_EVENT);

  // uses "useQuery" to fetch the current user's participation status of the event
  const { data, loading, error } = useQuery(EVENT_PARTICIPATION, {
    variables: {
      EventId: props?.event?.id,
    },
  });

  // function returns if current user is participating in the event or not
  function check() {
    if (checked) {
      return true;
    } else {
      for (var i = 0; i < data?.eventParticipation?.length; i++) {
        console.log(data?.eventParticipation[i].student?.id);
        if (data?.eventParticipation[i]?.student?.id === profile?.id) {
          return true;
        }
      }
    }
    return false;
  }

  // function to configure and call the joinEvent mutation
  const handleJoinEvent = () => {
    joinEvent({
      variables: {
        EventId: props?.event?.id,
        StudentId: profile?.id,
      },
      refetchQueries: ["eventParticipation"],
    });
    setChecked(true);
  };

  // function to configure and call the leaveEvent mutation
  const handleLeaveEvent = () => {
    leaveEvent({
      variables: {
        EventId: props?.event?.id,
        StudentId: profile?.id,
      },
      refetchQueries: ["eventParticipation"],
    });
    setChecked(false);
  };

  return (
    <div className="shadow flex flex-col items-start bg-white py-12 px-10 w-full rounded-2xl">
      <h1 className="text-3xl font-bold">{props?.event?.title}</h1>
      <div className="flex mt-7 items-center justify-between w-full">
        {/* displays the teacher's name and when the event was created, as well as an image of the teacher */}
        <div className="flex items-center">
          <div className="h-12 w-12">
            <img
              className="object-cover w-full h-full rounded-lg"
              // src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
              src={`https://avatar.oxro.io/avatar.svg?name=${props?.event?.teacher.firstName?.toUpperCase()}+${props.event.teacher.lastName.toUpperCase()}`}
            />
          </div>
          <div className="flex flex-col items-start ml-4">
            <p>
              {props?.event?.teacher?.firstName}{" "}
              {props?.event?.teacher.lastName}
            </p>
            <p className="text-gray-500">
              {moment(props?.event?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        {/* displays the date and time of the event, along with an icon for a calendar. */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 shadow rounded-lg px-4 py-2">
            <p>Quarter {props?.event?.quarter}</p>
          </div>
          <div className="flex items-center gap-2 shadow rounded-lg px-4 py-2">
            <p>{props?.event?.date.substring(0, 10)}</p>
            <HiOutlineCalendar />
          </div>
          <div className="flex items-center gap-2 shadow rounded-lg px-4 py-2">
            <p>
              {moment(`${props?.event?.time} PM`, ["HH:mm"]).format("hh:mm A")}
            </p>
            <HiOutlineClock />
          </div>
          <div className="flex text-indigo-600 bg-indigo-50 border-indigo-600 border items-center gap-2 shadow rounded-lg px-4 py-2">
            <p>{props?.event?.points} points</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-left">{props?.event?.description}</p>
      </div>
      {/* contains the button of 'join' or 'leave' depending on whether the user has already joined the event or not, which is determined by the `check()` function */}
      <div className="mt-6 flex w-full items-center justify-between">
        {role === "student" ? (
          check() ? (
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
              onClick={handleJoinEvent}
            >
              <HiUserAdd className="text-gray-300" size={25} />
              <p className="text-gray-700">Sign Up</p>
            </button>
          )
        ) : props?.event?.teacher?.id == profile?.id ? (
          <Link to={`/requests/${props?.event?.id}`}>
            <button className="flex bg-[#f9f9f9] hover:bg-gray-200 hover:border-gray-300 transition-colors duration-300 border border-gray-200 items-center px-3.5 py-1.5 gap-3 rounded-lg">
              <p className="text-gray-700">View Student List</p>
            </button>
          </Link>
        ) : (
          <div />
        )}
        <p className="text-gray-500">
          {data?.eventParticipation?.length} Signed Up
        </p>
      </div>
    </div>
  );
}

export default EventCard;

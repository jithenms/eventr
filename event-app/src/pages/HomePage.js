import React, { useState } from 'react';
import EventCard from '../components/home/EventCard';
import { HiSearch } from 'react-icons/hi';
import { BsPlus } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../graphql/queries';
import { useAuth } from '../auth/AuthContext';

// provides the list of all events that are hosted by the specific school.
function HomePage() {
  // useAuth hook is used to access the profile and role of the logged in user from the AuthContext.
  const { profile, role } = useAuth();

  // uses the useQuery hook to retrieve data from the GET_EVENTS query with the schoolId passed in as a variable.
  const { loading, error, data } = useQuery(GET_EVENTS, {
    fetchPolicy: "network-only",
    variables: {
      SchoolId: profile?.school?.id,
    },
  });

  if (error) console.log(error);
  if (data) console.log(data);

  return (
    <div className="h-screen flex flex-col pb-8 items-center">
      <div className="w-8/12">
        <div className="mt-10 w-full flex justify-end gap-4">
          {role === "teacher" && (
            <NavLink
              to="/new-event"
              className=" text-white bg-indigo-600 hover:text-white rounded-md p-2 px-3 gap-1 whitespace-nowrap flex items-center justify-center font-semibold shadow transition hover:scale-105 "
            >
              Create Event
              <BsPlus className="text-3xl mx-0 px-0 " />
            </NavLink>
          )}
        </div>
        {/* event list */}
        <div className="mt-5 flex flex-col w-full gap-6">
          {/* If the data is successfully retrieved, the events are mapped over and rendered using the EventCard component. */}
          {data?.schoolEvents?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import React from 'react';
import PrizeCard from '../components/prizes/PrizeCard';
import { useAuth } from '../auth/AuthContext';
import { BsPlus } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_STUDENT, SCHOOL_PRIZES } from '../graphql/queries';

function Prizes() {
  // used to access the user's profile information and role
  const { profile, role } = useAuth();

  // used to fetch the list of prizes for the user's school, specified by the school's ID
  const { data } = useQuery(SCHOOL_PRIZES, {
    fetchPolicy: "network-only",
    variables: {
      SchoolId: profile?.school?.id,
    },
  });

  return (
    <div className="flex flex-col h-screen items-center">
      <div className="mt-12 flex flex-row items-center gap-4">
        <h3 class="text-3xl sm:text-4xl leading-normal tracking-tight text-gray-900">
          Prizes
        </h3>
      </div>
      {/* 
        If the role is a teacher, a button to create a new prize is displayed
        The component uses Material-UI's TextField component for styling the input fields  
        and BsPlus component from 'react-icons/bs' for the create prize button
      */}
      {role === "teacher" && (
        <NavLink
          to="/new-prize"
          className="shadow-indigo-600 mt-4 text-white bg-indigo-600 hover:text-white rounded-md p-2 px-3 gap-1 whitespace-nowrap flex items-center justify-center font-semibold shadow transition hover:scale-105 "
        >
          <p>Create New Prize</p>
          <BsPlus className="text-3xl mx-0 px-0 " />
        </NavLink>
      )}
      <div className="mt-8 grid grid-cols-3 grid-flow-row gap-4 w-9/12">
        {/* map function is used to render a PrizeCard component for each prize, passing the prize's name, points required, description, and ID as props to the component. */}
        {data?.schoolPrizes?.map((prize) => (
          <PrizeCard
            title={prize?.name}
            points={prize?.pointsRequired}
            description={prize?.description}
            id={prize?.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Prizes;

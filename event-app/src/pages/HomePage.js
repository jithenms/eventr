import React from 'react';
import EventCard from '../components/home/EventCard';
import { HiSearch } from 'react-icons/hi';
import { BsPlus } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../graphql/queries';
import { useAuth } from '../auth/AuthContext';

function HomePage() {
    const { profile } = useAuth();

    const { loading, error, data } = useQuery(GET_EVENTS, {
        fetchPolicy: 'network-only',
        variables: {
            SchoolId: profile?.school?.id,
        },
    });
    if (error) console.log(error);
    if (data) console.log(data);

    return (
        <div className="flex items-center justify-center">
            <div className="w-8/12">
                {/* search bar */}
                <div className="mt-10 w-full flex gap-4">
                    <div className="flex items-center gap-4 justify-between w-full bg-white py-2 px-3 rounded-xl shadow">
                        <input
                            type="text"
                            className="w-full outline-none border-none ml-2"
                            placeholder="Search for event"
                        />
                        <button className="flex items-center justify-center rounded-2xl h-10 w-12 text-xl shadow shadow-indigo-600 text-white bg-indigo-600 ">
                            <HiSearch />
                        </button>
                    </div>
                    <NavLink
                        to="/new-event"
                        className="shadow-indigo-600 text-white bg-indigo-600 hover:text-white rounded-2xl p-2 px-3 gap-1 whitespace-nowrap flex items-center justify-center font-semibold shadow transition hover:scale-105 "
                        // className='text-indigo-600 flex items-center justify-center text-5xl'
                    >
                        <BsPlus className="text-3xl mx-0 px-0 " />
                    </NavLink>
                </div>
                {/* event list */}
                <div className="mt-5 flex flex-col w-full gap-6">
                    {data?.schoolEvents?.map((event) => (
                        <EventCard event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;

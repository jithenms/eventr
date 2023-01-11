import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

function Header() {
    const { logout } = useAuth();

    const handleClick = async () => {
        await logout();
    };
    return (
        <nav class="bg-white py-2 md:py-4 border">
            <div class="container px-4 mx-auto md:flex md:items-center">
                <div class="flex justify-between items-center">
                    <NavLink
                        to="/"
                        className="font-bold text-indigo-600 text-3xl"
                    >
                        eventr.
                    </NavLink>
                    <button
                        class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
                        id="navbar-toggle"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                </div>

                <div
                    class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
                    id="navbar-collapse"
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? 'p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600'
                                : 'p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) =>
                            isActive
                                ? 'p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600'
                                : 'p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                        }
                    >
                        Leaderboard
                    </NavLink>
                    <NavLink
                        to="/prizes"
                        className={({ isActive }) =>
                            isActive
                                ? 'p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600'
                                : 'p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                        }
                    >
                        Prizes
                    </NavLink>
                    <NavLink
                        to="/your-events"
                        className={({ isActive }) =>
                            isActive
                                ? 'p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600'
                                : 'p-2 lg:px-4 md:mx-2 text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300'
                        }
                    >
                        Profile
                    </NavLink>
                    <button onClick={handleClick}>
                        {/* <NavLink to='/login'> */}
                        <p className="p-2 lg:mx-4 md:mx-2 text-gray-600 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                            Sign Out
                        </p>
                        {/* </NavLink> */}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;

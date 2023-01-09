import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        // <div class='bg-[#F3F7F9] min-h-screen flex flex-col items-center justify-center'>
        // 	<Link
        // 		to='/register-student'
        // 		className='bg-indigo-600 text-center py-3 px-8 mt-4 rounded bg-green text-white hover:bg-indigo-700 focus:outline-none my-1'
        // 	>
        // 		I am a student
        // 	</Link>
        // 	<Link
        // 		to='/register-teacher'
        // 		className='bg-indigo-600 text-center py-3 px-8 mt-4 rounded bg-green text-white hover:bg-indigo-700 focus:outline-none my-1'
        // 	>
        // 		I am a teacher
        // 	</Link>
        // 	<Link to='/login'>I have an account</Link>
        // </div>
        <div class="bg-[#F3F7F9] min-h-screen flex flex-col">
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full flex flex-col">
                    <h1 className="text-indigo-600 text-6xl font-poppins font-extrabold text-center">
                        eventr.
                    </h1>
                    <h1 class="mb-8 mt-8 text-3xl text-center font-bold">
                        Register as a...
                    </h1>
                    <Link
                        to="/register-student"
                        className="bg-indigo-600 text-center py-3 px-8 mt-4 rounded text-white hover:bg-indigo-700 focus:outline-none my-1"
                    >
                        Student
                    </Link>
                    <Link
                        to="/register-teacher"
                        className="bg-indigo-600 text-center py-3 px-8 mt-4 rounded bg-green text-white hover:bg-indigo-700 focus:outline-none my-1"
                    >
                        Teacher
                    </Link>
                </div>

                <div class="text-grey-dark mt-6">
                    Already have an account?&nbsp;
                    <Link to="/login">
                        <span
                            class="no-underline border-b border-blue text-blue text-indigo-600"
                            href="../login/"
                        >
                            Log in here
                        </span>
                        .
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

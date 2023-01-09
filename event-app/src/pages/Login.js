import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const { login, loading } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate('/');
		} catch (error) {
			console.log(error.code);
			if (error.code === 'auth/user-not-found') {
				setError('User not found.');
			} else if (error.code === 'auth/wrong-password') {
				setError('Wrong password given.');
			}
		}
	};

	return (
		<div className='h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h1 className='text-indigo-600 text-6xl font-poppins font-extrabold text-center'>
						eventr.
					</h1>
					<h2 className='mt-6 text-center text-3xl tracking-tight font-bold text-gray-900'>
						Sign in to your account
					</h2>
					<p className='mt-2 text-center text-sm text-gray-600'>
						Or{' '}
						<Link to='/register'>
							<a
								href='#'
								className='font-medium text-indigo-600 hover:text-indigo-500'
							>
								register here
							</a>
						</Link>
					</p>
				</div>
				<p className='text-red-500 text-xs italic text-center'>{error}</p>
				<form className='mt-8 space-y-6' onSubmit={handleLogin}>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='email-address' className='sr-only'>
								Email address
							</label>
							<input
								id='email-address'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
								value={email}
								onChange={(data) => setEmail(data.target.value)}
							/>
						</div>
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
								value={password}
								onChange={(data) => setPassword(data.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
						>
							<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
								{/* <LockClosedIcon
									className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
									aria-hidden='true'
								/> */}
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;

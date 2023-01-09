import React from 'react';

function LoadingScreen() {
	return (
		<div className='flex items-center justify-center h-screen w-screen bg-[#F3F7F9]'>
			<div class='bg-white px-80 py-40 rounded-2xl shadow-md text-black flex flex-col items-center justify-center'>
				<h1 className='text-3xl'>Loading...</h1>
				<div
					class='w-12 h-12 rounded-full animate-spin mt-5
                    border-8 border-solid border-indigo-600 border-t-transparent shadow-md'
				/>
			</div>
		</div>
	);
}

export default LoadingScreen;

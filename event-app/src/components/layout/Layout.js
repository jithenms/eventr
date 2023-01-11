import Header from './Header';

// used as wrapper for rest of components to include header, bg-color, and css props by default
function Layout({ children }) {
	return (
		<div className='flex flex-col h-full'>
			<Header />
			<main className='bg-[#fafafa]'>{children}</main>
		</div>
	);
}

export default Layout;

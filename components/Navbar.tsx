import React from 'react';
import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='bg-gray-900 text-white p-4 flex justify-between'>
			<Link href='/' className='text-xl font-bold'>
				Ski Trip Cookbook
			</Link>
			<div className='flex gap-4'>
				<Link href='/' className='hover:text-gray-300'>
					Home
				</Link>
				<Link href='/' className='hover:text-gray-300'>
					Trips
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;

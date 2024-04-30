import {Outlet} from "react-router-dom";
import Navbar from '@/components/Navbar'


const Layout = () => {
	return (
		<div className="!bg-gray-50 h-full grid grid-cols-[100px_1fr]">
			<Navbar/>
			<main className="text-black bg-gray-50 py-6 px-7">
				<Outlet/>
			</main>
		</div>
	);
};

export default Layout;

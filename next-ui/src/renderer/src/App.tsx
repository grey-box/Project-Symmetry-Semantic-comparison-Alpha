import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout.tsx";
import ROUTES from "@/constants/ROUTES.ts";
import Home from "@/pages/Home.tsx";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.BASE} element={<Layout/>}>
					<Route index element={<Home/>}/>
					<Route path={ROUTES.PROFILE} element={<div>Profile</div>}/>
					<Route path={ROUTES.SETTINGS} element={<div>Settings</div>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App

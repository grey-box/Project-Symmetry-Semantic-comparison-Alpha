import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Layout from '@/components/Layout'
import ROUTES from '@/constants/ROUTES'
import Home from '@/pages/Home'

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
      <div>Hello world</div>
		</BrowserRouter>
	)
}

export default App

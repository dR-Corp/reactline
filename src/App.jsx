//import { Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {

	// const endpoints = {
	// 	"register": "http://192.168.1.104:3006/api/auth/login",
	// 	"login": "http://192.168.1.104:3006/api/auth/signup",
	// 	"products": "http://192.168.1.104:3006/api/product"
	// }

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	)

}

export default App
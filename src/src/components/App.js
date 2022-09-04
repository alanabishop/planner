import { BrowserRouter, Routes, Route } from "react-router-dom";

// - Components
import PrivateRoute from "./PrivateRoute";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Login from "./Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					></Route>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/update-profile" element={<UpdateProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

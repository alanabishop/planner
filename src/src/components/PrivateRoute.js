import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
	const { currentUser } = useAuth();
	let navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, []);

	return currentUser ? children : null;
};

export default PrivateRoute;

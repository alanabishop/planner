import React, { useState } from "react";
import { Box, Button, Text, Link } from "@chakra-ui/react";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
	const [error, setError] = useState("");
	const { currentUser, logout } = useAuth();
	const [userEmail, setUserEmail] = useState(currentUser.email);
	let navigate = useNavigate();

	useState(() => {
		setUserEmail(currentUser.email);
	}, []);

	const handleLogout = async () => {
		setError("");
		try {
			await logout();
			navigate("/login");
		} catch {
			setError("Failed to log out");
		}
	};

	return (
		<Box>
			<Text mb="5" as="h2" fontWeight="bold" fontSize="3xl" color="black">
				Profile
			</Text>
			<Text>Current user: {userEmail}</Text>
			<Link as={ReactLink} to="/update-profile">
				Need to update your email?
			</Link>
			{error && <Text>{error}</Text>}
			<Button display="block" onClick={handleLogout}>
				Log out
			</Button>
		</Box>
	);
};

export default Dashboard;

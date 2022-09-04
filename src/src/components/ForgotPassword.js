import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
	Text,
	Link,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";

// - Context
import { useAuth } from "../context/AuthProvider";

const ForgotPassword = () => {
	const emailRef = useRef(null);
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setSuccessMessage("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setSuccessMessage("Check your email for instructions");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	};

	return (
		<Box padding="5">
			<Text mb="5" as="h2" fontWeight="bold" fontSize="3xl" color="black">
				Get a new password
			</Text>
			{error && <Text>{error}</Text>}
			<form onSubmit={handleSubmit}>
				<FormControl mb="5">
					<FormLabel>Email</FormLabel>
					<Input id="email" ref={emailRef} type="email" required />
				</FormControl>

				<Button disabled={loading} w="100%" mt={4} bg="babyPink" type="submit">
					Reset password
				</Button>
			</form>
			{successMessage && <Text>{successMessage}</Text>}
			<Box color="mustard">
				<Text textAlign="center">
					Need an account?{" "}
					<Link as={ReactLink} to="/signup">
						Sign up
					</Link>
				</Text>
			</Box>
		</Box>
	);
};

export default ForgotPassword;

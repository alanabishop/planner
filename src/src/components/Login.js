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

const Login = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const { login } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	console.log(error);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError("Failed to log in");
		}
		setLoading(false);
	};

	return (
		<Box padding="5">
			<Text mb="5" as="h2" fontWeight="bold" fontSize="3xl" color="black">
				Log in
			</Text>
			{error && <Text>{error}</Text>}
			<form onSubmit={handleSubmit}>
				<FormControl mb="5">
					<FormLabel>Email</FormLabel>
					<Input id="email" ref={emailRef} type="email" required />
				</FormControl>
				<FormControl mb="5">
					<FormLabel>Password</FormLabel>
					<Input id="password" ref={passwordRef} type="password" required />
				</FormControl>
				<Link
					as={ReactLink}
					to="/forgot-password"
					display="block"
					textAlign="center"
				>
					Forgot password?
				</Link>
				<Button disabled={loading} w="100%" mt={4} bg="babyPink" type="submit">
					Log in
				</Button>
			</form>

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

export default Login;

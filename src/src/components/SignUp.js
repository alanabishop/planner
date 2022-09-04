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

const SignUp = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const passwordConfirmRef = useRef(null);
	const { signup } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError("Failed to create an account");
		}
		setLoading(false);
	};

	return (
		<Box padding="5">
			<Text mb="5" as="h2" fontWeight="bold" fontSize="3xl" color="black">
				Sign up
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
				<FormControl mb="5">
					<FormLabel>Confirm your password</FormLabel>
					<Input
						id="password-confirm"
						ref={passwordConfirmRef}
						type="password"
						required
					/>
				</FormControl>
				<Button disabled={loading} w="100%" mt={4} bg="babyPink" type="submit">
					Sign up
				</Button>
			</form>

			<Box color="mustard">
				<Text textAlign="center">
					Already have an account?{" "}
					<Link as={ReactLink} to="/login">
						Log in
					</Link>
				</Text>
			</Box>
		</Box>
	);
};

export default SignUp;

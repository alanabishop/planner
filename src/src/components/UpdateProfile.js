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

const UpdateProfile = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const passwordConfirmRef = useRef(null);
	const { currentUser, updatePassword, updateEmail } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				setError("Failed to update your account");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box padding="5">
			<Text mb="5" as="h2" fontWeight="bold" fontSize="3xl" color="black">
				Change your account details
			</Text>
			{error && <Text>{error}</Text>}
			<form onSubmit={handleSubmit}>
				<FormControl mb="5">
					<FormLabel>Email</FormLabel>
					<Input
						id="email"
						defaultValue={currentUser.email}
						ref={emailRef}
						type="email"
						required
					/>
				</FormControl>
				<FormControl mb="5">
					<FormLabel>Password</FormLabel>
					<Input
						id="password"
						ref={passwordRef}
						type="password"
						placeholder="Leave blank to keep the same"
					/>
				</FormControl>
				<FormControl mb="5">
					<FormLabel>Confirm your password</FormLabel>
					<Input
						id="password-confirm"
						ref={passwordConfirmRef}
						type="password"
						placeholder="Leave blank to keep the same"
					/>
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
					Update details
				</Button>
			</form>

			<Box color="mustard">
				<Link as={ReactLink} to="/">
					Cancel
				</Link>
			</Box>
		</Box>
	);
};

export default UpdateProfile;

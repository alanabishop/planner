import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(false);

	const signup = (email, password) => {
		auth.createUserWithEmailAndPassword(email, password);
	};

	const login = (email, password) => {
		auth.signInWithEmailAndPassword(email, password);
	};

	const logout = () => {
		return auth.signOut();
	};

	const resetPassword = (email) => {
		auth.sendPasswordResetEmail(email);
	};

	const updatePassword = (password) => {
		currentUser.updatePassword(password);
	};

	const updateEmail = (email) => {
		currentUser.updateEmail(email);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updatePassword,
		updateEmail,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

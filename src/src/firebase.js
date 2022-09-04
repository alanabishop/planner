import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
	apiKey: "AIzaSyCoCzDDEUau3VjlZT13E9QL6Gv9Y4XVLv4",
	authDomain: "planner-78559.firebaseapp.com",
	projectId: "planner-78559",
	storageBucket: "planner-78559.appspot.com",
	messagingSenderId: "1037889834074",
	appId: "1:1037889834074:web:e1e91969fd34c857855c63",
	measurementId: "G-TZW3MWNQTX",
});

export const auth = app.auth();
export default app;

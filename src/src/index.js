import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";

import { BaseTheme } from "./theme/theme";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ChakraProvider theme={BaseTheme}>
				<App />
			</ChakraProvider>
		</AuthProvider>
	</React.StrictMode>
);

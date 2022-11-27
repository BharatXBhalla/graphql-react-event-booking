const { createContext, useContext, useState } = require("react");

const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
	var [loginState, setLoginState] = useState({ token: null, userId: null });

	const login = (token, userId, tokenExpiration) => {
		// token = _token;
		// userId = _userId;

		console.log(token, userId, tokenExpiration);

		setLoginState((prevValue) => {
			console.log("In login", prevValue);
			return {
				userId,
				token,
			};
		});

		console.log("Calling Login Method");
	};

	const logout = () => {
		setLoginState((prevValue) => {
			return {
				userId: null,
				token: null,
			};
		});
	};

	return (
		<authContext.Provider
			value={{
				loginState,
				login,
				logout,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = () => {
	const context = useContext(authContext);

	if (!context) {
		throw new Error("No Context");
	}

	return context;
};

export { AuthContextProvider, useAuthContext };

export default authContext;

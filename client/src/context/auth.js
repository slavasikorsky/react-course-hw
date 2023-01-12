import { useReducer, createContext, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const JWT_TOKEN = "jwtToken";
const USER = "user";
const INITIAL_STATE = {
	user: null,
};

if (localStorage.getItem(JWT_TOKEN)) {
	const decodeToken = jwtDecode(localStorage.getItem(JWT_TOKEN));
	const username = localStorage.getItem(USER);
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem(JWT_TOKEN);
		localStorage.removeItem(USER);
	} else {
		INITIAL_STATE.user = { username, decodeToken };
	}
}
const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
});
function authReducer(state, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				user: action.payload.result,
			};
		case LOGOUT:
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}
function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);
	// const navigate = useNavigate();
	const login = useMemo(
		() => (userData) => {
			localStorage.setItem(JWT_TOKEN, userData.token);
			localStorage.setItem(USER, userData.result.fullName);
			dispatch({
				type: LOGIN,
				payload: userData,
			});
			// navigate("/dashboard");
		},
		[]
	);
	const logout = useMemo(
		() => () => {
			localStorage.removeItem(JWT_TOKEN);
			localStorage.removeItem(USER);
			dispatch({ type: LOGOUT });
			// navigate("/");
		},
		[]
	);
	const authValue = useMemo(
		() => ({
			user: state.user,
			login,
			logout,
		}),
		[state.user, login, logout]
	);
	return <AuthContext.Provider value={authValue} {...props} />;
}
export { AuthContext, AuthProvider };

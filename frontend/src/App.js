import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";
import { AuthContextProvider, useAuthContext } from "./context/auth-context";
import Experiment from "./pages/Experiment";

function AppRoutes() {
	const authContext = useAuthContext();

	return (
		<Routes>
			{!authContext.loginState.token && (
				<Route path="/" element={<Navigate to="/auth"></Navigate>} extact />
			)}

			{authContext.loginState.token && (
				<Route path="/" element={<Navigate to="/events"></Navigate>} extact />
			)}
			{authContext.loginState.token && (
				<Route
					path="/auth"
					element={<Navigate to="/events"></Navigate>}
					extact
				/>
			)}

			{!authContext.loginState.token && (
				<Route
					path="/bookings"
					element={<Navigate to="/auth"></Navigate>}
					extact
				/>
			)}

			{!authContext.loginState.token && (
				<Route extact path="/auth" element={<AuthPage></AuthPage>}></Route>
			)}

			<Route extact path="/events" element={<EventsPage></EventsPage>}></Route>
			{authContext.loginState.token && (
				<Route
					extact
					path="/bookings"
					element={<BookingsPage></BookingsPage>}
				></Route>
			)}

			<Route path="/experiment" element={<Experiment></Experiment>}></Route>
		</Routes>
	);
}
function App() {
	return (
		<BrowserRouter>
			<AuthContextProvider>
				<MainNavigation />
				<main className="main-content"></main>
				<AppRoutes />
			</AuthContextProvider>
		</BrowserRouter>
	);
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";
import MainNavigation from "./components/Navigation/MainNavigation";

function App() {
	return (
		<BrowserRouter>
			<MainNavigation />
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Navigate to="/auth"></Navigate>} extact />
					<Route extact path="/auth" element={<AuthPage></AuthPage>}></Route>
					<Route
						extact
						path="/events"
						element={<EventsPage></EventsPage>}
					></Route>
					<Route
						extact
						path="/bookings"
						element={<BookingsPage></BookingsPage>}
					></Route>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;

import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/auth-context";

import "./MainNavigation.css";

const MainNavigation = (props) => {
	const authContext = useAuthContext();

	return (
		<header className="main-navigation">
			<div className="main-navigation__logo">
				<h1>Events</h1>
			</div>
			<nav className="main-navigation__items">
				<ul>
					<li>
						<NavLink to="/events">Events</NavLink>
					</li>
					{authContext.loginState.token && (
						<li>
							<NavLink to="/bookings">Bookings</NavLink>
						</li>
					)}
					{!authContext.loginState.token && (
						<li>
							<NavLink to="/auth">Auth</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

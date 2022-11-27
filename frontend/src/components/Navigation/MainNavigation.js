import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = (props) => (
	<header className="main-navigation">
		<div className="main-navigation__logo">
			<h1>Events</h1>
		</div>
		<nav className="main-navigation__items">
			<ul>
				<li>
					<NavLink to="/events">Events</NavLink>
				</li>
				<li>
					<NavLink to="/bookings">Bookings</NavLink>
				</li>
				<li>
					<NavLink to="/auth">Auth</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default MainNavigation;

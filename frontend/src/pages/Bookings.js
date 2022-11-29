import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useAuthContext } from "../context/auth-context";

function BookingsPage() {
	const [isBookingLoading, setIsBookingLoading] = useState(false);
	const [bookings, setBookings] = useState([]);
	const authContext = useAuthContext();

	useEffect(() => {
		if (bookings.length === 0) {
			fetchBookings();
		}
	}, []);

	const fetchBookings = () => {
		setIsBookingLoading(true);

		let requestBody = {
			query: `
            query {
              bookings {
                    _id
					createdAt
					event {
						_id 
						title
						date
					}
                }
            }
            `,
		};
		fetch("http://localhost:8000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authContext.loginState.token,
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed");
				}
				return res.json();
			})
			.then((resData) => {
				const bookings = resData.data.bookings;
				setBookings(bookings);
				setIsBookingLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsBookingLoading(false);
			});
	};

	return (
		<div>
			{isBookingLoading ? (
				<Spinner />
			) : (
				<ul>
					{bookings.map((ele) => (
						<li key={ele._id}>
							{ele?.event?.title} {new Date(ele?.createdAt).toLocaleString()}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default BookingsPage;

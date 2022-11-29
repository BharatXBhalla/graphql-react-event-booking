import { Model } from "mongoose";
import React, { useState } from "react";
import { useAuthContext } from "../../../context/auth-context";
import BackDrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/modal";
import EventItems from "./EventItems/EventItems";
import "./EventList.css";

const EventList = ({ events, authUserId }) => {
	const [selectEvent, setSelectEvent] = useState(null);
	const authContext = useAuthContext();

	const modalCancelHandler = () => {
		setSelectEvent(null);
	};

	const viewDetailsHandler = (event) => {
		setSelectEvent(event);
	};

	const bookEventHandler = () => {
		let requestBody = {
			query: `
            mutation {
               bookEvent(eventId: "${selectEvent._id}")  {
                    _id
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
				console.log(resData);
				setSelectEvent(null);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<React.Fragment>
			{selectEvent && (
				<>
					<BackDrop></BackDrop>
					<Modal
						title="View Event"
						canCancel
						onCancel={modalCancelHandler}
						onConfirm={false}
					>
						<div>
							<h1>{selectEvent.title}</h1>
							<h2>
								${selectEvent.price} -{" "}
								{new Date(selectEvent.date).toLocaleDateString()}
							</h2>
						</div>
						{authContext?.loginState?.token && (
							<button className="btn" onClick={bookEventHandler}>
								Booking
							</button>
						)}
					</Modal>
				</>
			)}

			<ul className="events__list">
				{events.map((ele) => {
					return (
						<EventItems
							key={ele._id}
							event={ele}
							userId={authUserId}
							viewDetailsHandler={viewDetailsHandler}
						></EventItems>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default EventList;

import React, { useEffect, useRef, useState } from "react";
import BackDrop from "../components/Backdrop/Backdrop";
import EventItems from "../components/Events/EventList/EventItems/EventItems";
import EventList from "../components/Events/EventList/EventList";
import Modal from "../components/Modal/modal";
import Spinner from "../components/Spinner/Spinner";
import { useAuthContext } from "../context/auth-context";
import "./Events.css";

const validationInput = (value) => {
	return value.trim().length === 0;
};

function EventsPage() {
	const [creating, setCreating] = useState(false);
	const [events, setEvents] = useState([]);
	const [isEventLoading, setIsEventLoading] = useState(false);
	const titleElRef = useRef();
	const priceElRef = useRef();
	const descriptionElRef = useRef();
	const context = useAuthContext();

	useEffect(() => {
		if (events.length === 0) {
			fetchEvents();
		}
	}, []);

	const startCreateEvenetHandler = () => {
		setCreating((prev) => {
			return true;
		});
	};

	const modalConfirmHandler = () => {
		setCreating((prev) => {
			return false;
		});

		const title = titleElRef.current.value;
		const price = +priceElRef.current.value;
		const description = descriptionElRef.current.value;

		if (validationInput(title) || price <= 0 || validationInput(description)) {
			return;
		}

		let requestBody = {
			query: `
            mutation {
                createEvent(eventInput:{ title: "${title}",price:${price},description:"${description}"}){
                    _id
					title
					description
					date
					price
                }
            }
            `,
		};
		fetch("http://localhost:8000/graphql", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + context.loginState.token,
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
				setEvents((prevValue) => {
					const updatedEvents = [...prevValue];
					updatedEvents.push({
						_id: resData.data.createEvent._id,
						title: resData.data.createEvent.title,
						description: resData.data.createEvent.description,
						date: resData.data.createEvent.date,
						price: resData.data.createEvent.price,
						creator: {
							_id: context.loginState.userId,
							email: context.loginState.email,
						},
					});

					setEvents(updatedEvents);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const modalCancelHandler = () => {
		setCreating((prev) => {
			return false;
		});
	};

	const fetchEvents = () => {
		setIsEventLoading(true);
		let requestBody = {
			query: `
            query {
                events {
                    _id
					title 
					description
					date
					price
					creator {
						_id 
						email
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
			},
		})
			.then((res) => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error("Failed");
				}
				return res.json();
			})
			.then((resData) => {
				const events = resData?.data?.events;

				setEvents((prevVal) => {
					return events;
				});

				setIsEventLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsEventLoading(false);
			});
	};

	return (
		<React.Fragment>
			{creating && (
				<React.Fragment>
					<BackDrop></BackDrop>
					<Modal
						title="Add Event"
						canCancel
						canConfirm
						onCancel={modalCancelHandler}
						onConfirm={modalConfirmHandler}
					>
						<form>
							<div className="form-control">
								<label htmlFor="title">Title</label>
								<input type="text" id="title" ref={titleElRef}></input>
							</div>

							<div className="form-control">
								<label htmlFor="Price">Price</label>
								<input type="number" id="Price" ref={priceElRef}></input>
							</div>

							<div className="form-control">
								<label htmlFor="description">Desciption</label>
								<textarea
									id="description"
									rows="4"
									ref={descriptionElRef}
								></textarea>
							</div>
						</form>
					</Modal>
				</React.Fragment>
			)}

			{context.loginState.token && (
				<div className="events-control">
					<p>Share your own Events</p>
					<button className="btn" onClick={startCreateEvenetHandler}>
						Create Event
					</button>
				</div>
			)}

			{isEventLoading ? (
				<Spinner></Spinner>
			) : (
				<EventList
					events={events}
					authUserId={context?.loginState?.userId}
				></EventList>
			)}
		</React.Fragment>
	);
}

export default EventsPage;

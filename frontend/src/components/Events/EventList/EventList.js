import { Model } from "mongoose";
import React, { useState } from "react";
import BackDrop from "../../Backdrop/Backdrop";
import Modal from "../../Modal/modal";
import EventItems from "./EventItems/EventItems";
import "./EventList.css";

const EventList = ({ events, authUserId }) => {
	const [selectEvent, setSelectEvent] = useState(null);

	const modalCancelHandler = () => {
		setSelectEvent(null);
	};

	const viewDetailsHandler = (event) => {
		setSelectEvent(event);
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

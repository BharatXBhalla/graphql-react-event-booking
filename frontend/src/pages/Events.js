import React, { useState } from "react";
import BackDrop from "../components/Backdrop/Backdrop";
import Modal from "../components/Modal/modal";
import "./Events.css";

function EventsPage() {
	const [creating, setCreating] = useState(false);

	const startCreateEvenetHandler = () => {
		setCreating((prev) => {
			return true;
		});
	};

	const modalConfirmHandler = () => {
		setCreating((prev) => {
			return false;
		});
	};

	const modalCancelHandler = () => {
		setCreating((prev) => {
			return false;
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
						<p>kkdm</p>
					</Modal>
				</React.Fragment>
			)}

			<div className="events-control">
				<p>Share your own Events</p>
				<button className="btn" onClick={startCreateEvenetHandler}>
					Create Event
				</button>
			</div>
		</React.Fragment>
	);
}

export default EventsPage;

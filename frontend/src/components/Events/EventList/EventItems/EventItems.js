import "./EventItems.css";

const EventItems = function ({ event, userId, viewDetailsHandler }) {
	return (
		<li key={event._id} className="events__list-item">
			<div>
				<h1>{event.title}</h1>
				<h2>
					${event.price} - {new Date(event.date).toLocaleDateString()}
				</h2>
			</div>
			<div>
				{userId !== event?.creator?._id && (
					<button className="btn" onClick={() => viewDetailsHandler(event)}>
						View Details
					</button>
				)}
				{userId === event?.creator?._id && <p>Your the owner of this event.</p>}
			</div>
		</li>
	);
};
export default EventItems;

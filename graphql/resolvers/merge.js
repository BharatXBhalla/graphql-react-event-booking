const EventModel = require("../../models/events");
const UserModel = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const events = async (eventIds) => {
	return await (
		await EventModel.find({ _id: { $in: eventIds } })
	).map((event) => {
		return transformEvent(event);
	});
};

const singleEvent = async (eventId) => {
	const event = await EventModel.findById(eventId);
	if (!event) return {};
	return transformEvent(event);
};

const user = async (userId) => {
	const user = await UserModel.findById(userId);
	if (!user) return {};
	return {
		...user._doc,
		createdEvents: events.bind(this, user.createdEvents),
	};
};

const transformEvent = (event) => {
	return {
		...event._doc,
		date: dateToString(event.date),
		creator: user.bind(this, event.creator),
	};
};

const transformBooking = (booking) => {
	return {
		...booking._doc,
		user: user(booking.user),
		event: singleEvent(booking.event),
		createdAt: dateToString(booking.createdAt),
		updatedAt: dateToString(booking.updatedAt),
	};
};

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

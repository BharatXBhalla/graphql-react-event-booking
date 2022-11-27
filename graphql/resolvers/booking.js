const EventModel = require("../../models/events");
const BookingModel = require("../../models/booking");
const { transformBooking } = require("./merge");

module.exports = {
	bookings: async () => {
		const bookings = await BookingModel.find();
		return bookings.map((booking) => {
			return transformBooking(booking);
		});
	},
	bookEvent: async (args) => {
		const event = await EventModel.findById(args.eventId);

		if (!event) {
			throw new Error("No Event Found");
		}
		const booking = await BookingModel.create({
			user: "6382e77bf3cc8ec2f360533f",
			event: event._id,
		});
		return transformBooking(booking);
	},
	cancelBooking: async (args) => {
		const booking = await (
			await BookingModel.findById(args.bookingId)
		).populate("event");
		await BookingModel.deleteOne({ _id: args.bookingId });

		return transformEvent(booking.event);
	},
};

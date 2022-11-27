const EventModel = require("../../models/events");
const UserModel = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
	events: async () => {
		return await (
			await EventModel.find()
		).map((event) => {
			return transformEvent(event);
		});
	},
	createEvent: async (args) => {
		const event = await EventModel.create({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: args.eventInput.price,
			date: new Date(),
			creator: "6382e77bf3cc8ec2f360533f",
		});

		const User = await UserModel.findById("6382e77bf3cc8ec2f360533f");

		if (!User) {
			throw new Error("No User Found");
		}

		User.createdEvents.push(event._id);

		await User.save();

		return transformEvent(event);
	},
};

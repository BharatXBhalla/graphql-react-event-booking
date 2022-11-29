const EventModel = require("../../models/events");
const UserModel = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
	events: async () => {
		return (await EventModel.find()).map((event) => {
			return transformEvent(event);
		});
	},
	createEvent: async (args, req) => {
		if (!req.isAuth) {
			throw new Error("UnAuth");
		}
		const event = await EventModel.create({
			title: args.eventInput.title,
			description: args.eventInput.description,
			price: args.eventInput.price,
			date: new Date(),
			creator: req.userId,
		});

		const User = await UserModel.findById(req.userId);

		if (!User) {
			throw new Error("No User Found");
		}

		User.createdEvents.push(event._id);

		await User.save();

		return transformEvent(event);
	},
};

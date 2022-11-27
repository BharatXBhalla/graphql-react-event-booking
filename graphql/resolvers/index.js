const bcrypt = require("bcryptjs");
const EventModel = require("../../models/events");
const UserModel = require("../../models/user");

const events = async (eventIds) => {
	return await (
		await EventModel.find({ _id: { $in: eventIds } })
	).map((event) => {
		return {
			...event._doc,
			date: new Date(event.date).toISOString(),
			creator: user.bind(this, event.creator),
		};
	});
};

const user = async (userId) => {
	const user = await UserModel.findById(userId);
	return {
		...user._doc,
		createdEvents: events.bind(this, user.createdEvents),
	};
};

module.exports = {
	events: async () => {
		return await (
			await EventModel.find()
		).map((event) => {
			return {
				...event._doc,
				date: new Date(event.date).toISOString(),
				creator: user(event.creator),
			};
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

		return {
			...event._doc,
			creator: user(event.creator),
		};
	},
	createUser: async (args) => {
		const existingUser = await UserModel.findOne({
			email: args.userInput.email,
		});

		if (existingUser) {
			throw new Error("Existing User");
		}
		const hashPassword = await bcrypt.hash(args.userInput.password, 12);
		const user = await UserModel.create({
			email: args.userInput.email,
			password: hashPassword,
		});

		return {
			email: user.email,
			_id: user._id,
		};
	},
};

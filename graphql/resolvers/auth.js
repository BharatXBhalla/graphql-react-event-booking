const bcrypt = require("bcryptjs");
const UserModel = require("../../models/user");

module.exports = {
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

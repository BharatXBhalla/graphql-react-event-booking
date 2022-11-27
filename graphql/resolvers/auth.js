const bcrypt = require("bcryptjs");
const UserModel = require("../../models/user");
const jwt = require("jsonwebtoken");

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
	login: async ({ email, password }) => {
		const user = await UserModel.findOne({
			email,
		});

		if (!user) {
			throw new Error("User Does not Exist");
		}

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			throw new Error("Password Incorrect");
		}

		const token = jwt.sign(
			{
				userId: user._id,
				email: user.email,
			},
			"bharatbhalla",
			{
				expiresIn: "1h",
			},
		);

		return {
			userId: user._id,
			token,
			tokenExpiration: 1,
		};
	},
};

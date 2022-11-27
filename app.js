const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const EventModel = require("./models/events");
const UserModel = require("./models/user");

const app = express();

app.use(bodyParser.json());

app.use(
	"/graphql",
	graphqlHTTP({
		schema: buildSchema(`

            type Event {
                _id: ID!,
                title: String!,
                description: String!,
                price: Float!,
                date: String!
            }

            type User {
                _id: ID!,
                email: String!,
                password: String,
            }

            input EventInput{
                title: String!,
                description: String!,
                price: Float!
            }

            input UserInput {
                email: String!,
                password: String!
            }

            type RootQuery {
                events: [Event!]!
            }
            type RootMutation {
                createEvent(eventInput: EventInput): Event
                createUser(userInput: UserInput): User
            }
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
		rootValue: {
			events: async () => {
				return await EventModel.find();
			},
			createEvent: async (args) => {
				const event = await EventModel.create({
					title: args.eventInput.title,
					description: args.eventInput.description,
					price: args.eventInput.price,
					date: new Date(),
					creator: "6382e77bf3cc8ec2f360533f",
				});

				const user = await UserModel.findById("6382e77bf3cc8ec2f360533f");

				if (!user) {
					throw new Error("No User Found");
				}

				user.createdEvents.push(event._id);

				await user.save();

				return event;
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
		},
		graphiql: true,
	}),
);

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("connected");
	})
	.catch((err) => console.log(err));

app.listen(3000);

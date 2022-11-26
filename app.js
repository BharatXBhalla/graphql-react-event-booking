const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const EventModel = require("./models/events");

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

            input EventInput{
                title: String!,
                description: String!,
                price: Float!
            }

            type RootQuery {
                events: [Event!]!
            }
            type RootMutation {
                createEvent(eventInput: EventInput): Event
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
				});

				return event;
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

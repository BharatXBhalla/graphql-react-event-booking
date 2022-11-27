const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/isAuth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log("A new Request" + req.method);
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
	if (req.method == "OPTIONS") {
		return res.status(200).send();
	}
	next();
});

app.use(isAuth);

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true,
	}),
);

mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("connected");
	})
	.catch((err) => console.log(err));

app.listen(8000);

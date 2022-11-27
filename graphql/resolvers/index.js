const authResolver = require("./auth");
const bookingResolver = require("./booking");
const eventResolver = require("./events");

module.exports = {
	...authResolver,
	...bookingResolver,
	...eventResolver,
};

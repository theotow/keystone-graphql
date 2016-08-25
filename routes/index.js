/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
var keystone = require('keystone');
var middleware = require('./middleware');

var apollo = require('apollo-server');
var gTools = require('graphql-tools');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};


var schema = require('./schema.js');
var Posts = require('./posts.js').default;

var executableSchema = gTools.makeExecutableSchema({
	typeDefs: schema.schema,
	resolvers: schema.resolver,
});

// Setup Route Bindings
exports = module.exports = function (app) {
	app.use('/', serveStatic(__dirname + '/../client/build'));

	// Views
	app.use(serveStatic(__dirname + '/../client/build', {'index': ['index.html'] }));
	app.use('/graphql', bodyParser.json(), apollo.apolloExpress({
		schema: executableSchema,
		context: {
			posts: new Posts(),
		},
	}));
	app.use('/graphiql', apollo.graphiqlExpress({
		endpointURL: '/graphql',
	}));
};

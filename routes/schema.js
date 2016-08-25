let firebase = require('./firebase');
import { Kind } from 'graphql/language';

export const schema = [`
type Post {
	title: String!
	text: String!
	author: String!
	liked: Boolean!
	createdAt: Date!
	likes: [Like]
	_id: String!
}

type Like {
	author: String!
}

scalar Date

type Query {
  posts: [Post]
}
type Mutation {
  createPost(
		title: String!,
		text: String!,
		userToken: String!
	): Post

	likePost(
		postId: String!,
		userToken: String!
	): Post

	unlikePost(
		postId: String!,
		userToken: String!
	): Post

	removePost(
		postId: String!,
		userToken: String!
	): Post
}
schema {
  query: Query
  mutation: Mutation
}
`];

export const resolver = {
	Query: {
		posts (_, __, context) {
			return Promise.resolve().then(() => (context.posts.getPosts()));
		},
	},
	Post: {
		likes (_, __, context) {
			return Promise.resolve().then(() => (context.posts.getPostLikes(_._id)));
		},
	},
	Mutation: {
		createPost (_, { userToken, title, text, author }, context) {
			return Promise.resolve().then(() => (context.posts.createPost(userToken, title, text, [], firebase)));
		},
		likePost (_, { userToken, postId }, context) {
			return Promise.resolve().then(() => (context.posts.likePost(userToken, postId, firebase)));
		},
		unlikePost (_, { userToken, postId }, context) {
			return Promise.resolve().then(() => (context.posts.unlikePost(userToken, postId, firebase)));
		},
		removePost (_, { userToken, postId }, context) {
			return Promise.resolve().then(() => (context.posts.removePost(userToken, postId, firebase)));
		},
	},
	Date: {
		__parseValue (value) {
			return new Date(value); // value from the client
		},
		__serialize (value) {
			return value.getTime(); // value sent to the client
		},
		__parseLiteral (ast) {
			if (ast.kind === Kind.INT) {
				return (parseInt(ast.value, 10)); // ast value is always in string format
			}
			return null;
		},
	},
};

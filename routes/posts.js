var keystone = require('keystone');
var Post = keystone.list('Post');
var Like = keystone.list('Like');
var Likes = require('./likes').default;
var LikesInstance = new Likes();
var Promise = require('bluebird');
var _ = require('lodash');
import * as utils from './utils';

export default class Posts {
	getPosts () {
		return Post.model.find().populate('likes').lean().exec()
	}
	createPost (userToken, title, text, likes, firebase) {
		return Promise.resolve().then(function () {
			return firebase.auth().verifyIdToken(userToken).then((data) => (data));
		}).then(function (userData) {
			var newPost = new Post.model({
				title,
				author: userData.uid,
				text,
				likes,
			});
			return utils.saveModel(newPost);
		});
	}
	getPostLikes (postId) {
		return Promise.resolve().then(
			() => Post.model.findById(postId).populate('likes').exec()
		).then((post) => (post && post.likes) ? post.likes : []);
	}
	likePost (userToken, postId, firebase) {
		return Promise.resolve().then(function () {
			return firebase.auth().verifyIdToken(userToken).then((data) => (data));
		}).then(function (userData) {
			return Promise.resolve().then(
				() => Post.model.findById(postId).populate('likes').exec()
			).then((post) => [userData, post]);
		}).spread(function (userData, post) {
			return createLike(post, userData.uid);
		});
	}
	unlikePost (userToken, postId, firebase) {
		return Promise.resolve().then(function () {
			return firebase.auth().verifyIdToken(userToken).then((data) => (data));
		}).then(function (userData) {
			return Promise.resolve().then(
				() => Post.model.findById(postId).populate('likes').exec()
			).then((post) => [userData, post]);
		}).spread(function (userData, post) {
			return Promise.resolve().then(
				() => Like.model.find().where({ author: userData.uid }).exec()
			).then((likesOfUser) => [userData, post, likesOfUser]);
		}).spread(function (userData, post, likesOfUser) {
			return unLike(post, userData.uid, likesOfUser);
		});
	}
	removePost (userToken, postId, firebase) {
		return Promise.resolve().then(function () {
			return firebase.auth().verifyIdToken(userToken).then((data) => (data));
		}).then(function (userData) {
			return Promise.resolve().then(
				() => Post.model.findById(postId).exec()
			).then((post) => [userData, post]);
		}).spread(function (userData, post) {
			var deferred = Promise.pending();
			if (userData.uid === post.author) {
				post.remove(
					(err) => (err) ? deferred.reject(err) : deferred.resolve(true)
				);
			} else {
				return deferred.resolve('Not allowed');
			}
			return deferred.promise;
		});
	}
}

function createLike (post, userId) {
	return Promise.resolve().then(() => {
		return LikesInstance.createLike(userId);
	}).then((like) => {
		if (_.findIndex(post.likes, { author: userId }) === -1) {
			post.likes.push(like._id);
		}
		return utils.saveModel(post);
	});
}

function unLike (post, userId, likesOfUser) {
	return Promise.resolve().then(() => {
		var index = _.findIndex(post.likes, { author: userId });
		if (index !== -1) {
			post.likes.splice(index, 1);
		}
		return utils.saveModel(post);
	});
}

import test from 'ava';
var app = require('../keystone_withenv');
var keystone = require('keystone');

var Posts = require('../routes/posts').default;
let Post = keystone.list('Post');
let Like = keystone.list('Like');
let PostsInstance = new Posts();
import { fakeFirebase, fakePost } from './fixtures/index';
import _ from 'lodash';
import Promise from 'bluebird';

test.cb.beforeEach(t => {
	Post.model.find().remove(t.end);
});

test.cb('post should be liked by user', t => {
	t.plan(1);
	var user = 'manuel';
	var newLike = new Like.model({
		author: user,
	});
	newLike.save(function () {
		var newPost = new Post.model(fakePost);
		newPost.likes.push(newLike._id);
		newPost.save(function () {
			PostsInstance.getPosts().then((res) => {
				let like = _.find(res[0].likes, { author: user });
				t.is(like.author, user);
				t.end();
			});
		});
	});
});

test.cb('post should not be liked by user', t => {
	t.plan(1);
	var user = 'manuel';
	var newLike = new Like.model({
		author: user,
	});
	newLike.save(function () {
		var newPost = new Post.model(fakePost);
		newPost.save(function () {
			PostsInstance.getPosts().then((res) => {
				let like = _.find(res[0].likes, { author: user });
				t.is(like, undefined);
				t.end();
			});
		});
	});
});

test.cb('should create an post', t => {
	var newLike = new Like.model({
		author: 'c',
	});
	newLike.save(function () {
		t.plan(1);
		PostsInstance.createPost('<whatever>', 'a', 'b', [newLike._id], fakeFirebase('manuel')).then((res) => {
			Post.model.findById(res._id).populate('likes').lean().exec().then(function (res) {
				res.likes = _.map(res.likes, (like) => _.pick(like, ['author']));
				let resSelected = _.pick(res, ['text', 'title', 'likes', 'author']);
				t.deepEqual(resSelected, {
					title: 'a',
					text: 'b',
					author: 'manuel',
					likes: [{
						author: 'c',
					}],
				});
				t.end();
			});
		});
	});
});

test.cb('should delete an post ', t => {
	t.plan(1);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		PostsInstance.removePost('<whatever>', res._id, fakeFirebase('manuel')).then(function (resInner) {
			Post.model.find().exec().then((resP) => {
				t.is(resP.length, 0);
				t.end();
			});
		});
	});
});

test.cb('should not be able to delete someone elses post ', t => {
	t.plan(1);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		PostsInstance.removePost('<whatever>', res._id, fakeFirebase('badass')).then(function (res, err) {
			Post.model.find().exec().then((resP) => {
				t.is(resP.length, 1);
				t.end();
			});
		});
	});
});

test.cb('should be able to like post', t => {
	t.plan(1);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		PostsInstance.likePost('<whatever>', res._id, fakeFirebase('manuel')).then(function (resLike) {
			Post.model.findById(res._id).exec().then((resInner) => {
				t.is(resInner.likes.length, 1);
				t.end();
			});
		}).catch(t.end);
	}).catch(t.end);
});

test.cb('should be able to unlike post', t => {
	t.plan(1);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		PostsInstance.likePost('<whatever>', res._id, fakeFirebase('manuel')).then(function (resLike) {
			PostsInstance.unlikePost('<whatever>', res._id, fakeFirebase('manuel')).then((resInner) => {
				Post.model.findById(res._id).exec().then((resInner) => {
					t.is(resInner.likes.length, 0);
					t.end();
				});
			});
		});
	});
});

test.cb('should be able to like post only once', t => {
	t.plan(1);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		Promise.reduce([0, 1],
			() => PostsInstance.likePost('<whatever>', res._id, fakeFirebase('manuel')), {})
			.then(() => {
				Post.model.findById(res._id).exec().then((resInner) => {
					t.is(resInner.likes.length, 1);
					t.end();
				});
			});
	});
});

test.cb('should be able to unlike post but only delete my like', t => {
	t.plan(2);
	PostsInstance.createPost('<whatever>', 'a', 'b', [], fakeFirebase('manuel')).then(function (res) {
		Promise.reduce(['peter', 'manuel'],
			(total, val) => PostsInstance.likePost('<whatever>', res._id, fakeFirebase(val)), {})
			.then(() => {
				PostsInstance.unlikePost('<whatever>', res._id, fakeFirebase('manuel')).then((resInner) => {
					Post.model.findById(res._id).populate('likes').exec().then((resInner) => {
						t.is(resInner.likes.length, 1);
						t.is(resInner.likes[0].author, 'peter');
						t.end();
					});
				});
			});
	});
});

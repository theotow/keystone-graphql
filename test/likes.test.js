import test from 'ava';
var app = require('../keystone_withenv');
var keystone = require('keystone');

var Likes = require('../routes/likes').default;
let Like = keystone.list('Like');
let LikesInstance = new Likes();

test.cb.beforeEach(t => {
	Like.model.find().remove(t.end);
});

test.cb('should create an like', t => {
	t.plan(1);
	LikesInstance.createLike('manuel').then((res) => {
		Like.model.find().exec().then((res) => {
			t.is(res[0].author, 'manuel');
			t.end();
		});
	});
});

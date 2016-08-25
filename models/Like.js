var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Like = new keystone.List('Like', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Like.add({
	author: { type: String },
	createdAt: { type: Date, default: Date.now },
});

Like.defaultColumns = 'author, createdAt|15%';
Like.register();

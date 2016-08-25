var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Post.add({
	title: { type: Types.Text, required: true, default: '' },
	text: { type: Types.Text, required: true, default: '' },
	author: { type: Types.Text },
	likes: { type: Types.Relationship, ref: 'Like', many: true },
	createdAt: { type: Date, default: Date.now },
});

Post.defaultColumns = 'title, text|20%, author, createdAt|15%';
Post.register();

import Promise from 'bluebird';

export function fakeFirebase (userId) {
	return {
		auth: () => {
			return {
				verifyIdToken: () => {
					return Promise.resolve({ uid: userId });
				},
			};
		},
	};
}

export const fakePost = {
	title: 'title',
	author: 'author',
	text: 'text',
	likes: [],
};

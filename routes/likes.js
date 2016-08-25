var keystone = require('keystone');
var Like = keystone.list('Like');
import * as utils from './utils';

export default class Likes {
	createLike (author) {
		var newLike = new Like.model({
			author,
		});
		return utils.saveModel(newLike);
	}
}

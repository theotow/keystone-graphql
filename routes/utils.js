import Promise from 'bluebird';

export function saveModel (model) {
	var deferred = Promise.pending();
	model.save(
		(err) => (err) ? deferred.reject(err) : deferred.resolve(model.toObject())
	);
	return deferred.promise;
}

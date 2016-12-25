'use strict';

const fs = require('fs');

exports.connect = filePath => {

	const p = new Promise((resolve, reject) => {

		fs.readFile(filePath, 'utf8', (err, data) => {

			if (err) reject(err);

			const objects = JSON.parse(data);
			let lastObjectId = Math.max(...objects.map(o => o.id)); 
		
			resolve({
				getAll: () => {
					return new Promise(resolve => {
						setImmediate(() => resolve(objects),0);
					});
				},
				get: id => {
					return new Promise(resolve => {
						setImmediate(() => resolve(objects.find(o => o.id === id)),0);
					});
				},
				insert: item => {
					return new Promise(resolve => {
						item.id = ++lastObjectId;
						objects.push(item);
						setImmediate(() => resolve(item));
					});
				},
				update: item => {
					return new Promise(resolve => {
						if (!item.id) throw Error('id must be set');
						Object.assign(objects.find(o => o.id === item.id), item);
						setImmediate(() => resolve(item));
					});
				},
				delete: id => {
					return new Promise(resolve => {
						const deletedItem = objects.find(o => o.id === id);
						objects.splice(objects.indexOf(deletedItem),1);
						setImmediate(() => resolve(deletedItem));
					});					
				}
			});
	
		});

	});

	return p.then.bind(p);

};



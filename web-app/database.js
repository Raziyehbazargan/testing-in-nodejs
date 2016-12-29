const crypto = require('crypto');
const secret = 'secret';

const users = [
	{ id: 1, username: 'bob', password: '0329a06b62cd16b33eb6792be8c60b158d89a2ee3a876fce9a881ebb488c0914' },
	{ id: 2, username: 'jen', password: 'f53a4f367b28af17bc53df477ae8ee2590b185f439d58cfda03ecf056b3f623b' }
];

exports.authenticate = (username, password) => {
	const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
	return users.find(user => user.username === username && user.password === hash);
};
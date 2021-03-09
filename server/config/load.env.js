const fs = require('fs');

fs.readFile('./.env', 'utf8', function(err, data) {
	if (err) return
	const strEnvFile = data.match(/SECRET_JWT=null/gi)
	if (strEnvFile) {
		const secretToken = crypto.randomBytes(64).toString('hex');
		data = data.replace(/SECRET_JWT=null/gi, `SECRET_JWT=${secretToken}`)
		fs.writeFile('./.env', data , function(err) {
			if (err) return console.error(err);
			console.log('done', data);
		})
	}
})

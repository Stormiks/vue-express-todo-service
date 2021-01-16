const express = require('express');
const fs = require('fs');
const path = require('path')
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback') // Для корректной работы vue-router в express
const cors = require('cors');
const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const crypto = require('crypto')

fs.readFile('./.env', 'utf8', function(err, data) {
	if (err) return
	let strEnvFile = data.match(/SECRET_JWT=null/gi)
	if (strEnvFile) {
		const secretToken = crypto.randomBytes(64).toString('hex');
		data = data.replace(/SECRET_JWT=null/gi, `SECRET_JWT=${secretToken}`)
		fs.writeFile('./.env', data , function(err) {
			if(err) return console.error(err);
			console.log('done', data);
		})
	}
})

dotenv.config()

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(history());
app.use('/file', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('views'));

require('./router/')(app);

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './todo-app.sqlite3'
});

const db = require('./db/models/');

const port = process.env.APP_PORT_NODE || 8081;

app.listen(port, 'localhost', async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		// db.sequelize.sync({ force: true });
		db.sequelize.sync();
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	console.log('server start', port);
});

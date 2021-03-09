const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback') // Для корректной работы vue-router в express
const cors = require('cors');
const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const crypto = require('crypto');
const passport = require('passport');

require('./config/load.env');

dotenv.config()

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(history());

app.use('/file', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('views'));

app.use(passport.initialize());
app.use(passport.session());

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

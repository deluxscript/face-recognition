const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

const database = {
	users: [
		{
			id: '123',
			name: 'Wale',
			email: 'wale@gmail.com',
			password: 'oladele',
			entries: 0,
			joined: new Date()
		},
		{
			id: '133',
			name: 'Oladele',
			email: 'oladele@gmail.com',
			password: '20172017',
			entries: 1,
			joined: new Date()
		}
	]
}

//Using middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {

	// Load hash from your password DB.
	// bcrypt.compare("oladele", "$2b$10$LPbPmb52A8fwjofqtP.0DeZgcEwO9X9iDkmhTguGLgMjRcpUfHruq", function(err, res) {
	// 	// res == true
	// 	console.log('Valid', res);
	// });
	// bcrypt.compare("someOtherPlaintextPassword", "$2b$10$LPbPmb52A8fwjofqtP.0DeZgcEwO9X9iDkmhTguGLgMjRcpUfHruq", function(err, res) {
	// 	// res == false
	// 	console.log('Invalid', res);
	// });

	if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
		res.json('Success signing in');
	}
	else {
		res.status(400).json('error signing in');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	
	database.users.push({
		id: '134',
		name: name,
		email: email,
		// password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id ) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(404).json('No user found');
	}
})

app.put('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id ) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(404).json('No user found');
	}
})

app.listen(3001, () => {
	console.log('App is running on port 3001');
})

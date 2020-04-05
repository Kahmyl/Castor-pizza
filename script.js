const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/Pub'));




const database = {
	users:[
       {
       	  id: '123',
          name: 'John',
          password: 'Cookies',
       	  email: 'john@gmail.com',
       	  entries: 0,
       	  joined: new Date()
       },
       {
       	  id: '124',
          name: 'Sally',
          password: 'Apples',
       	  email: 'sally@gmail.com',
       	  entries: 0,
       	  joined: new Date()
       }
	],
	login: [
	{
		id:'987',
		has:'',
		email:'john@gmail.com'
	}]
}

app.get('/', (req, res)=> {
	res.send(database.users);
});

app.post('/sign in',(req, res) => {
	bcrypt.compare("apples",'$2b$10$EdzmhZrTXorBPn5/gskR0e2z0ED/KRzPe9vzG/o2QEb8XfA6V4LoO', function(err, result) {
       console.log('first guess', res)
    });
	bcrypt.compare("apples", '$2b$10$EdzmhZrTXorBPn5/gskR0e2z0ED/KRzPe9vzG/o2QEb8XfA6V4LoO', function(err, result) {
       console.log('second guess', res)
    });
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
	  res.json('success');	
	} else {
		res.status(400).json('error logging in');
	}
});

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	
    database.users.push({
    	id: '125',
       	name: name,
       	email: email,
       	password: password,
       	entries: 0,
       	joined: new Date()
    });
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
    	if (user.id === id){
    		found = true
    		return res.json(user);
    	}
    })
    if (!found){
    	res.status(400).json('not found');
    }
})

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.listen(4000, ()=> {
	console.log('app is running on port 4000');
})



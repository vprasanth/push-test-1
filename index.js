
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const ObjectID = require('bson').ObjectID;

let db;
const app = express();
// setup middleware
app.use(bodyParser.json());

async function init() {
	const url = 'mongodb://localhost:27017/myproject';
	let db;
	let collection;
	try {
		db = await mongo.connect(url);
		let collections = await db.collections();
		collections.forEach(c => console.log(c.collectionName));
		return db;
	} catch (e) {
		throw e;
	}
}

init().then(_db => {
	db = _db;
	collection = db.collection('bk');
}).catch(err => {
	console.log(err);
});

app.post('/bookmark', (req, res, next) => {
	collection.insert(req.body).then(result => {
		res.send(result);
	}).catch(err => {
		res.status(400).send(err);
	});

});

app.get('/bookmark/:id', (req, res) => {
	collection.findOne(new ObjectID(req.params.id)).then(result => {
		res.send(result);
	}).catch(err => {
		console.log(err);
		res.sendStatus(400);
	});
});

app.delete('/bookmark/:id', (req, res) => {
	collection.deleteOne({_id: new ObjectID(req.params.id)}).then(result => {
		res.send(result);
	}).catch(err => {
		console.log(err);
		res.sendStatus(400);
	});
});

app.get('/bookmarks', (req, res) => {
	collection.find({}).toArray().then(result => {
		res.send(result);
	}).catch(err => {
		console.log(err);
		res.statsendStatusus(400);
	});
});

app.listen(3000);

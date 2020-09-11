const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({origin: true}));

const data = require ("./data.js");

//------------------------------------------------------GET

app.get('/', (req, res)=> {
	res.send('hello Selfcity, je suis un serveur basique')
})

app.get('/users', (req, res)=> {
	data.getDataUser()
	.then (result =>{
		res.json({
			"success":true,
			"statusCode":"200",
			"message":null,
			"result":result,
		})
	})
	.catch(err=>{
		res.json("Error getting documents",err);
	})
})

app.get('/trips', (req, res)=> {
	data.getData()
	.then(result=>{
		res.json({
			"success":true,
			"statusCode":"200",
			"message":null,
			"result":result
		})
	})
	.catch(err =>{
		console.log("Error", err);
	})
})

//------------------------------------------------POST

app.post('/users', (req, res)=> {
	let newUser= {
		"username":req.body.username,
		"email":req.body.email,
		"password":req.body.password
	}
	data.addDataUser(newUser)
	.then(ref=>{
		res.json({
			"success": true,
			"statusCode":201,
			"message": "succes",
			"result": null,
		})
	})
	.catch(err=>{
		res.json({
			"message":"req.body params are undefined"
		})
	})
})

app.post('/trips', (req, res)=> {
	let newTrip= {
		"date":req.body.date,
		"title":req.body.title,
		"startTime":req.body.startTime,
		"endTime":req.body.endTime,
		"description":req.body.description,
		"address":req.body.address,
		"userId":req.body.id
	}
	data.addData(newTrip)
	.then (ref=>{
		res.json({
			"success": true,
			"statusCode":201,
			"message": "success",
			"result": newTrip
		})
	})
	.catch (err => {
		res.json({
			"message":"req.body params are undefined"
		})
	})
})

exports.api = functions.https.onRequest(app);
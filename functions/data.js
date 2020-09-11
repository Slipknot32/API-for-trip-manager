const admin = require("firebase-admin");

const serviceAccount = require("./keyFile.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://trip-manager-api.firebaseio.com"
});
const db = admin.firestore();


//---------------------------------get user
const getDataUser = () =>{
	return db.collection("users").get()
	.then (ref =>{
		let result = [];
		ref.forEach(doc =>{
			result.push(doc.data());
		})
		return result;
	})
	.catch(err=>{
		console.log("Error getting documents",err);
	})		
};
//---------------------------------get trips
const getData = () =>{

	return db.collection('trips').limit(10).get()
	.then (ref =>{
		let result = [];
		ref.forEach(doc =>{
			result.push(doc.data());
		})
		return result;
	})
	.catch(err=>{
		console.log("Error getting documents",err);
	})	
};
//---------------------------------add user
const addDataUser =(user) =>{
	return db.collection('users').add(user)
	.then(ref =>{
		console.log("add user in a databse ",ref.id);
	})
	.catch(err=>{
		console.log(err);
	})	
};
//---------------------------------add trips

const addData = (trip) => {
	return db.collection('trips').add(trip)
};

//----------------------------module exports 
module.exports =  {
  getDataUser: getDataUser,
  getData : getData,
  addDataUser: addDataUser,
  addData: addData
};

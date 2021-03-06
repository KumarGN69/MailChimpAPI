//jshintt esversion : 6

const port = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
	
	res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
	
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email= req.body.email;
	console.log(firstName, lastName, email);
	const data ={
		members:[
			{
				email_address:email,
				status:"subscribed",
				merge_fields:{
					FNAME:firstName,
					LNAME:lastName
				}
			}
		]	
	};
	const jsonData = JSON.stringify(data);
	
	const url = "https://us14.api.mailchimp.com/3.0/lists/1afc537426";
	const options = {
		method: "POST",
		auth: "KumarGN1969:9388594e6301f7f1bb9d13888637a7ae-us14"
	}
	
	const request = https.request(url, options, function(response){
		console.log(response.statusCode);
		if(response.statusCode === 200){
			res.sendFile(__dirname + "/success.html");
		}else {
			res.sendFile(__dirname + "/failure.html");
		}
		
		response.on("data",function(data){
			
			console.log(JSON.parse(data));
			
		});
	});
	request.write(jsonData);
	request.end();
});

app.post("/failure",function(req,res){
	res.redirect("/");
});

app.listen(port, function(){
	console.log("Server started on "+ port);
});


// mailchimp APIkey
// 67ced35c6c8942de3bc7d9c61cfe7e1c-us14
//mailchip audience ID
//1afc537426
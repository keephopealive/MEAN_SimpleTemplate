// ~~~ Configuration ~~~

// Express
var express = require('express');
var app = express();

// Body Praser 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Static Folder
app.use(express.static(__dirname+'/static'));

// Server Listening...
app.listen(1337);

// ~~~ End of Configuration ~~~




// ~~~ Mongoose ~~~

// Mongoose
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cpoSchema');

// Customer Schema
var CustomerSchema = new mongoose.Schema({
  name: { type: String, required:true, trim:true},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
// Save Schema in Model
mongoose.model('Customer', CustomerSchema);
// Retrieve Schema from Model
var Customer = mongoose.model('Customer');

// ~~~ End of Mongoose ~~~



		
// ~~~ Routes ~~~

// Routes
	app.get('/customers', function(req, res){
		console.log(3)
		Customer.find({}, function(err, customers){
			console.log(4)
			return res.json(customers);
		})
	})

	app.post('/customers', function(req, res){
		var customerInstance = new Customer(req.body); // OR var customerInstance = new Customer({name: req.body.name});
		customerInstance.save(function(err){
			if(err){ return res.json(err.errors) }
			else { return res.json([]); }		
		})
	})

	app.delete('/customers/:id', function(req, res){
		Customer.remove({ _id: req.params.id }, function(err){
			return res.json(true);
		})
	})

	app.get('/customers/:id', function(req, res){
		Customer.findOne({_id:req.params.id}, function(err, customer){
			return res.json(customer);
		})
	})

	app.put('/customers/:id', function(req, res){
		Customer.update({_id: req.params.id}, {name: req.body.name }, function(err, customer){
			return res.json(true)
		})
	})

// ~~~ End of Routes ~~~
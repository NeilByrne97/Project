var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://G00343624:G00343624pw@ds051077.mlab.com:51077/mean_project';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var postSchema = new Schema({
    title: String,
    name: String,
    number: Number,
    password: String,
    email: String
    
})    // When adding put it in post-create.component.ts, post.model.ts, post.service.ts and server.js/app.post
var PostModel = mongoose.model('post', postSchema);


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.name);
    console.log(req.body.number);
    console.log(req.body.password);
    console.log(req.body.email);

    PostModel.create({
        title: req.body.title,
        name: req.body.name,
        number: req.body.number,
        password: req.body.password,
        email: req.body.email
    });
    res.send('Item added');


})

app.get('/api/posts', function(req, res){
    PostModel.find(function(err, data){
        res.json(data);
    });
})

app.get('/api/posts/:id', function(req, res){
    console.log("Read post " +req.params.id);

    //PostModel.find({_id : req.params.id}, 
    PostModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
})

app.put('/api/posts/:id', function(req, res){
    console.log("Update Post" +req.params.id);
    console.log(req.body.title);
    console.log(req.body.name);
    console.log(req.body.number);
    console.log(req.body.password);
    console.log(req.body.email);


    PostModel.findByIdAndUpdate(req.params.id, req.body, 
        function(err, data){
            res.send(data);
        })
})

app.delete('/api/posts/:id', function(req, res){
    console.log(req.params.id);

    PostModel.deleteOne({_id:req.params.id},
    function(err, data)
    {
        if(err)
            res.send(err);
        res.send(data);
    })
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
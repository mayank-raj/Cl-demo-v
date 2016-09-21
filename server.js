var express = require('express')
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList',function(req,res){
  db.contactList.find(function (err,docs){
    console.log(docs);
    res.json(docs);
  });
});

app.post('/contactList',function(req,res){
  console.log(req.body);
  db.contactList.insert(req.body,function(err,doc){
    res.json(doc);
  });
});

app.delete('/contactList/:id',function (req,res){
  var id = req.params.id;
  db.contactList.remove({_id:mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
  });
  console.log('ToDelete:: '+ id);
});

app.get('/contactList/:id',function(req,res){
  var id = req.params.id;
  console.log("the id searched for :: "+id);
  db.contactList.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
    console.log("find one error:: "+err);
    res.json(docs);
  });
});

app.put('/contactList/:id',function(req,res){
  var id = req.params.id;
  db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update:{$set:{name: req.body.name, email:req.body.email, number:req.body.number}},
    new: true},function(err,docs){
      res.json(docs);
    });
});

app.listen(3000);
console.log('server running on port 3000');

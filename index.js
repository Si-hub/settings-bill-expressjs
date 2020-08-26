//this is a top-level function exported by the express module
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser'); 
const express = require("express");
var moment = require('moment'); // require
moment().format();
const BillWithSettings = require('./settings-bill');

//instances
const app = express();
const settingsBill = BillWithSettings();

//registering the template engine express-handlebars as handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');


// Note: for the values to besent on server you will  
// need to install and set up body-parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//this will make server instance to find css, other resources stored in the public folder
app.use(express.static('public'))

// GET method route
app.get("/", function(req, res){
// send the rendered view to the client ( what is inside this index.handlebars file)
res.render("index", { 
  //display data back to screen (render the data back)
  settings: settingsBill.getSettings(), 
  totals: settingsBill.totals()
  });
});

//set the Post route
app.post("/settings", function(req, res){

  settingsBill.setSettings({
    theCallCost: req.body.theCallCost,
    theSmsCost: req.body.theSmsCost,
    theWarningLevel: req.body.theWarningLevel,
    theCriticalLevel: req.body.theCriticalLevel,
  })
// after redirect back to default route or it will be executed on the default route
    res.redirect("/")    
});

// action is also a Post route
app.post("/action", function(req, res){
   settingsBill.recordAction(req.body.actionType)
  res.redirect("/")  
})

//display all the actions that has been made
app.get("/actions", function(req, res){
  var actionList = settingsBill.actions() 

  for(let key of actionList){
    key.ago = moment(key.timestamp).fromNow()
  }
   res.render("actions", {actions: actionList});
});

//dynamic route that will display call or sms
app.get("/actions/:actionType", function(req, res){
    const actionType = req.params.actionType;
    var actionList = settingsBill.actionsFor(actionType) 

  for(let key of actionList){
    key.ago = moment(key.timestamp).fromNow()
  }
  res.render("actions", {actions: settingsBill.actionsFor(actionType) });
})

//telling the server what port to listen on
let PORT = process.env.PORT || 3011;  

// when a server listen it uses port number: 3011
app.listen(PORT, function(){
  console.log('App starting on port:', PORT); 
                                            
});
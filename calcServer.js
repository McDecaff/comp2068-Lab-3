/**
 * Created by Nick Metcalf on 2016-09-23.
 */

//Initialize dependency variables
var connect = require('connect');
var url = require('url');
var serveStatic = require('serve-static');

//Establish a connection
var app = connect();


function add(){
    return 5 + 5;
}


//Function to calculate the inputs and display them to the user
var calculate = function(req,res, next){
    //Grab the querystring
    var qs = url.parse(req.url, true).query;

    //Fill variables with querystring values
    var x = parseFloat(qs.x);
    var y = parseFloat(qs.y);
    var method = qs.method;

    //Process the 'method' variable
    if (method == "add"){
        var result  = (x + y);
        method = " + ";
    }else if (method == "subtract"){
        var result  = (x - y);
        method = " - ";
    }else if (method == "divide"){
        var result  = (x / y);
        method = " / "
    }else if (method == "multiply"){
        var result  = (x * y);
        method = " x ";
    }else{
        res.end("<h1>ERROR</h1>");
    };

    //Display the result to the user
    res.end('<h1>'+x+method+y+' = '+result+'</h1>');
};
//simple fallback/mock 404 return
var fallback = function(rew,res,next){
    res.end("<H1>404 PAGE NOT FOUND</h1>")
};

//use the calculate function via '/calculate'
app.use('/lab3',calculate);
//use the HTML based input form via /form
app.use('/form',serveStatic('calcForm.html'));
//use for fallback
app.use(fallback);

//Listen on localhost port 3000
app.listen(3000);

//Console server status output
console.log(3000);
console.log('Connect running on port 3000');
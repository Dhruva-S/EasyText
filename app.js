const express=require("express");//require express module
const path=require('path'); 
const app=express();//initializes a new express app
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 


//Listening on the default port for a hosting server and on port 3000 for the localhost 
app.listen(process.env.PORT||3000,function(req,res){
    console.log("server has started om port 3000");
});


app.use(express.static(__dirname + '/public'));
var wd = require("word-definition");
app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
});


app.get("/html/myeditor.html",function(req,res){
    // res.sendFile(__dirname+"/html/myeditor.html");
    res.sendFile(path.join(__dirname,'html','myeditor.html'));
});


app.post("/",function(req,res){
    wd.getDef(req.body.word, "en", null, function(word) {
         
        //  console.log(typeof(ans));
        console.log(word.definition);
    //     res.write("<p>The definition is "+ ans+" </p>");
    //    res.send();
    var name=word.word;
    var category=word.category;
    var definition=word.definition;
   
            res.render('searchResult', { 
                name: name,
                category: category,
                definition :definition
                });
    });
   });
   
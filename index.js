const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "Hazel",
        content: "I love parrots",

    },
    {
        id: uuidv4(),
        username: "naturedoxy",
        content: "Air is always refressing",

    },
    {
        id: uuidv4(),
        username: "Ram",
        content: "Work hard to achieve it",

    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id); 
    res.render("show.ejs",{ post });
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content; //patch side par jake new content add kr ri hu or req.boby sde newCont variable m add kr ri hu 
    let post = posts.find((p) => id === p.id); 
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}= req.params;
    posts = posts.filter((p) => id !== p.id); 
    res.redirect("/posts");
});

app.listen(port, (req,res)=>{
    console.log(`Listening to the Port: ${port}`);
});

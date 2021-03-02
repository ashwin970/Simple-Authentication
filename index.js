const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');

app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost:27017/Authentication',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
    
});

const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open",()=>{
    console.log("database connected");
})


app.get('/',(req, res)=>{
    res.send('this is home e-page');
})

app.get('/register',(req, res)=>{
    res.render("register.ejs");
})

app.post('/register',async(req,res)=>{
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/secret',(req, res)=>{
    res.send('secret');
})

app.listen(3000,()=>{
    console.log('listening');
})
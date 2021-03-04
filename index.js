const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded({extended:true}));
app.use(session({secret: 'notagoodsecret', resave: false, saveUninitialized: false}));


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

const requireLogin = (req, res, next) =>{
    if(!req.session.user_id){
        return res.redirect('/login')
    }
    next();
}


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
    req.session.user_id = user._id;
    res.redirect('/');
})

app.get('/login',(req, res)=>{
    res.render("login.ejs");
})

app.post('/login',async(req, res)=>{
    const { username, password } = req.body;
   const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
    }else{
        res.redirect("/login");
    }
})


app.post('/logout',(req, res)=>{
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret',requireLogin,(req, res)=>{

    res.render("secret.ejs");
})

app.listen(3000,()=>{
    console.log('listening');
})
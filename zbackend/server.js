const express = require('express')
const cors = require('cors')
require('dotenv').config()
const session = require('express-session');
const path = require('path')
const app = express()




app.use(cors({ 
    origin : process.env.CORS,
   credentials: true
}))

app.use(express.json());
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => res.redirect('http://localhost:3000/dashboard')
// );




const register = require('./routes/register')
const login =require('./routes/login')
const product= require('./api/procductname')
const user_cart = require('./api/user_cart')
const delete_item = require('./api/remove')

app.use('/image', express.static(path.join(__dirname, 'routes/image')))
app.use('/' , product)
app.use('/' , login)
app.use('/', register)
app.use('/', user_cart)
app.use('/' , delete_item)

const port = process.env.PORT || 4000



app.listen(port, () =>{ 
    console.log(`running on port ${port}`);
    
})

// todo import require

const express= require ('express')
const app = express()
const port = process.env.port || 5000


// import config files from db connect
const  connectDB=require( './config/db')

//call the  function
connectDB();

//TODO initializing  Middleware
// two ways init middleware one is npm package bodyparser middle last one is inbuile experss 4.16+ inbuilt function() 
// If you are using Express 4.16+ you can now replace that express .json() instead of bodyparser.json() line with
app.use(express.json({ extended: false}));


//todo Main req server
app.get('/', (req, res) => {res.send('express server is working')})
app.listen(port, () => {console.log(`Example app listening on port ${port}`)})


// todo define route

app.use('/api/admin',require('./routes/api/admin'))
app.use('/api/useradmin',require('./routes/api/useradmin'))
app.use('/api/userpost',require('./routes/api/userpost'))
app.use('/api/userprofile',require('./routes/api/userprofile'))





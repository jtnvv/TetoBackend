const express = require('express')
const app=express()
const { PORT, CLIENT_URL }=require('./constants')
const cookieParser=require('cookie-parser')
const passport = require('passport')
const cors=require('cors')

//import passport middlewares
require('./middlewares/passport-middleware')

//initialize middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:CLIENT_URL,credentials:true}))
app.use(passport.initialize())

//import routes
const authRoutes=require('./routes/auth')

//intialize Routes
app.use('/api',authRoutes)

//app start
const appStart=()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`aplicacion corriendo en http://localhost:${PORT}`)
        })
    } catch (err) {
    console.log(`Error: ${err.message}`)       
    }
}

appStart()
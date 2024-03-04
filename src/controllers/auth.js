const db = require('../db')
const {hash}=require('bcryptjs')
const {sign}=require('jsonwebtoken')
const {SECRET}=require('../constants')


exports.getUsers=async(req,res)=>{
    try {
        const {rows}=await db.query('select user_id,email from users')
        return res.status(201).json({
            success:true,
            users: rows
        })
    } catch (err) {
        console.error(err.message)
    }
}

exports.register=async(req,res)=>{
    console.log("s1")
    const {email,password}=req.body
    try {
        const hashedPassword = await hash(password,10)
        await db.query('INSERT INTO users (email,password) values ($1 ,$2)',[email,hashedPassword])
        console.log("s2") 
        return res.status(201).json({
            success: true,
            message: "registro exitoso"
        })
        console.log('Validación pasada')
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message
        })
    }
}

exports.login=async(req,res)=>{
    let user=req.user
    let payload={
        id:user.user_id,
        email: user.email
    }
    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token',token,{httpOnly:true}).json({
            success:true,
            message: 'login exitoso'
        })       
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error:err.message,
        })
        
    }
}

exports.protected=async(req,res)=>{
    try {
        return res.status(201).json({
            info:'protected info',
        })
    } catch (err) {
        console.error(err.message)
    }
}

exports.logout=async(req,res)=>{
   
    try {
        return res.status(200).clearCookie('token',{httpOnly:true}).json({
            success:true,
            message: 'logout exitoso'
        })       
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error:err.message,
        })
        
    }
}
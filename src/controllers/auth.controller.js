import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { server } from '../config/teto.js';
import User from '../database/models/User.js';

const { sign } = pkg;

export const getUsers = async (req,res) => {
    try {
        const {rows}=await sequelize.query('select id,email from users')
        return res.status(201).json({
            success:true,
            users: rows
        })
    } catch (err) {
        console.error(err.message)
    }
}

export const register = async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
          email: email,
          password: hashedPassword,
        });


        return res.status(201).json({
            success: true,
            message: "registro exitoso"
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })
    }
}

export const login = async (req,res) => {
    let user=req.user
    let payload={
        id:user.id,
        email: user.email
    }
    try {
        const token = await sign(payload, server.secret)
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

export const protectedRoute = async (req,res) => {
    try {
        return res.status(201).json({
            info:'protected info',
        })
    } catch (err) {
        console.error(err.message)
    }
}

export const logout = async (req,res) => {
   
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
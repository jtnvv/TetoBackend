import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { server } from '../config/teto.js';
import User from '../database/models/User.js';
import Store from '../database/models/Store.js';

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
            message: "registro exitoso",
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })
    }
}

export const registerBrand = async function(req,res){
    try {
        const request = req.body;
        const hashedPassword = await bcrypt.hash(request.password, 10);
        
        await Store.create({
        name: request.name,
        city: request.city,
        email: request.email,
        password: hashedPassword,
        phone_number: request.phone_number,
        description: request.description,
        logo: request.logo,
        });


        return res.status(201).json({
            message: "Registro exitoso"
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })
    }
}

export const login = async (req,res) => {    
    try {
        let payload={
            id: req.user.id,
            email: req.user.email
        }
        const token = await sign(payload, server.secret);

        return res.status(200).cookie('token',token,{httpOnly:true}).json({
            success:true,
            message: 'Inicio de sesión exitoso',
        })       
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error:err.message,
        })
        
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
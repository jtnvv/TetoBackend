import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { server } from '../config/teto.js';
import User from '../database/models/User.js';
import Store from '../database/models/Store.js';
import { server_mail, server_mail_pass } from "../config/teto.js";
import nodemailer from 'nodemailer';

const { sign } = pkg;

export const getUsers = async (req, res) => {
    try {
        const { rows } = await sequelize.query('select id,email from users')
        return res.status(201).json({
            success: true,
            users: rows
        })
    } catch (err) {
        console.error(err.message)
    }
}

export const register = async function (req, res) {
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



export const registerBrand = async function (req, res) {
    try {

        const request = req.body;
        const hashedPassword = await bcrypt.hash(request.password, 10);

        await Store.create({
            name: request.name,
            city: request.address,
            email: request.email,
            password: hashedPassword,
            phone_number: request.phone,
            description: request.description.toLowerCase(),
            logo: "logo.jpg", //implementar despues
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

        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            success: true,
            message: 'Inicio de sesión exitoso',
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })

    }
}

export const logout = async (req, res) => {

    try {
        return res.status(200).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'logout exitoso'
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })

    }
}

export const changePassword = async (req, res) => {
    console.log(req.body.email," ",req.body.pass)
    const mail = req.body.email;
    const pass = req.body.pass;
    try {
        
        await User.update({ password: pass }, {
          where: {
            email: mail,
          },
        });
    
        await res.status(200).json({ message: "password Updated" });
      } catch (error) {
        await res.status(500).json({ message: error.message });
      }
}

export const sendEmail = async (req, res) => {
    let emailReceptor = req.body.recipient_email
    let codigoConfirmacion = req.body.OTP
    try {
        return new Promise((resolve, reject) => {
            console.log(server_mail, " ",server_mail_pass)
            var transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: server_mail,
                    pass: server_mail_pass,
                },
            });
    
            const mail_configs = {
                from: server_mail,
                to: emailReceptor,
                subject: "Teto: Ropa colombiana PASSWORD RECOVERY",
                html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
        
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Teto Ropa Colombiana</a>
          </div>
          <p style="font-size:1.1em">Sup,</p>
          <p>Gracias por escoger TETO. Usa el siguiente código para recuperar tu cuenta. El código es valido por 5 minutos</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${codigoConfirmacion}</h2>
          <p style="font-size:0.9em;">Saludos desde,<br />TETO</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Teto</p>
            <p>Ropa</p>
            <p>Colombia</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
            };
            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    console.log(error);
                    return reject({ message: `An error has occured` });
                }
                return resolve({ message: "Email sent succesfuly" });
            });
        });
        
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })
    }
    
}
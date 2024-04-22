import sequelize from '../database/models/index.js';
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import { emailTemplate, server } from '../config/teto.js';
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
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (await Store.findOne({ where: { email: email } })){
            return res.status(409).json({
                message: "El correo ya se encuentra registrado",
            })
        }

        await User.create({
            name:name,
            email: email,
            password: hashedPassword,
        });


        return res.status(201).json({
            success: true,
            message: "registro exitoso",
        })
    } catch (err) {
    
        return res.status(500).json({
            error: err.message,
        })
    }
}



export const registerBrand = async function (req, res) {
    try {
        const request = req.body;
        const hashedPassword = await bcrypt.hash(request.password, 10);

        if (await User.findOne({ where: { email: request.email } })) {
            return res.status(409).json({
                message: "El correo ya se encuentra registrado",
            })
        }

        await Store.create({
            name: request.name,
            city: request.address,
            email: request.email,
            password: hashedPassword,
            phone_number: request.phone,
            description: request.description.toLowerCase(),
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

export const login = async (req, res) => {
    try {
        let payload = {
            id: req.user.id,
            email: req.user.email
        }

        const token = await sign(payload, server.secret);

        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            message: 'Inicio de sesión exitoso',
            role: req.role,
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
            message: 'Cerraste sesión correctamente'
        })
    } catch (err) {
        console.error(err.message)
        return res.status(500).json({
            error: err.message,
        })

    }
}

export const changePassword = async (req, res) => {
    const mail = req.body.email;
    const pass = req.body.pass;
    try {
        const hashedPassword = await bcrypt.hash(pass, 10);
        await User.update({ password: hashedPassword }, {
            where: {
                email: mail,
            },
        });

        return await res.status(200).json({ message: "Password Updated" });

    } catch (error) {
        await res.status(500).json({ message: error.message });
    }
}

export const sendEmail = async (req, res) => {
    let emailReceptor = req.body.recipient_email
    let codigoConfirmacion = req.body.OTP
    try {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: server_mail,
                    pass: server_mail_pass,
                },
            });

            const mail_configs = {
                from: server_mail,
                to: emailReceptor,
                subject: "Teto: Ropa colombiana PASSWORD RECOVERY",
                html: emailTemplate(codigoConfirmacion),
            };

            transporter.sendMail(mail_configs, function (error, info) {
                if (error) {
                    return reject({ message: error });
                }
                return resolve({ message: "Email sent succesfuly" });
            });
            return res.status(200).json({
                message: "Correo enviado con exito",
            })
        }).catch((err) => {
            console.log(err)
        });

    } catch (err) {
        return res.status(500).json({
            error: err.message,
        })
    }

}
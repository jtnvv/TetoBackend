import passport from "./passport-middleware.js";
import { role } from "../config/role.js";
import User from "../database/models/User.js";

export const userAuth = ({ability}) => (req, res, next) => {
    passport.authenticate('jwt', async (err, user, info) => {
        if (err) { 
           return next(err);
        }
        if (!user) {
            return res.status(403).json({message: "No existe el usuario"})
        } else {
            user = await User.findOne({
                where: {
                    id: user.id
                }
            });
            if (!role[user.role].includes(ability)) {
                return res.status(403).json({message: "No tienes permisos para acceder a esta ruta"})
            }
        }
        req.user = user;
        next();
     })(req, res, next);
};
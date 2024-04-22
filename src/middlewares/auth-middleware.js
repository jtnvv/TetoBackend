import passport from "./passport-middleware.js";
import { role } from "../config/role.js";

export const userAuth = ({ ability }) => (req, res, next) => {
    passport.authenticate('jwt', async (err, user) => {
    
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(403).json({ message: "No existe el usuario" })
        } else {
            console.log(user.role);
            if (!role[user.role].includes(ability)) {
                return res.status(403).json({ message: "No tienes permisos para acceder a este sitio" })
            }
        }
        req.user = user;
        next();
    })(req, res, next);
};
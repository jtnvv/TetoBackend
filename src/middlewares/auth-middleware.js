import passport from "./passport-middleware.js";
export const userAuth = passport.authenticate('jwt',{session:false});
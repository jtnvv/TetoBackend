import passport from 'passport';
import pkg from "passport-jwt";
import { server } from '../config/teto.js';
import User from '../database/models/User.js';
import Store from '../database/models/Store.js';

const { Strategy } = pkg;

const cookieExtractor = function (req) {
    let token = null
    if (req && req.cookies) token = req.cookies['token']
    return token
}

const opts = {
    secretOrKey: server.secret,
    jwtFromRequest: cookieExtractor,
};

passport.use(
    new Strategy(opts, async ({ id }, done) => {
        try {
            let res = await User.findOne({
                where: {
                    id: id,
                },
            });
            
            if (!res) {
                res = await Store.findOne({
                    where: {
                        id: id,
                    },
                });
            }

            if (!res) {
                throw new Error("401 no Autorizado");
            }
            
            let user = res;
            return await done(null, user);
        } catch (err) {
            done(err, false);
        }
    })
);

export default passport;
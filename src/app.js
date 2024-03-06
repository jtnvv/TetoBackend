import express from 'express';
import { client } from './config/teto.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import itemRoutes from './routes/item.routes.js';
import storeRoutes from "./routes/store.routes.js";
import authRoutes  from './routes/auth.routes.js';

const app = express();

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:client.url,credentials:true}))
app.use(passport.initialize())

// Routes
app.use(storeRoutes);
app.use(itemRoutes);
app.use(authRoutes);

export default app;




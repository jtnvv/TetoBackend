import express from 'express';
import itemRoutes from './routes/item.routes.js';
import storeRoutes from "./routes/store.routes.js";

const app = express();

//middleware
app.use(express.json());

app.use(storeRoutes);
app.use(itemRoutes);

export default app;
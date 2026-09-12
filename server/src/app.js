import express from 'express';

import authRoutes from './modules/auth/auth.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

export default app;





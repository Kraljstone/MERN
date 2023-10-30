import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
const port = process.env.PORT || 8000;
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

connectDB();
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

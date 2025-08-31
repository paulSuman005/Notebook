import express, { Request, Response } from 'express';
import morgan from 'morgan';
import errorMeddleware from './middleware/errorMiddleware';
import userRouter from './router/userRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());    // to parse the incoming request body as JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data

app.use(cookieParser());

app.use(morgan('dev'));  // to log the details of incoming requests


app.use('/test', (req: Request, res: Response) => {
    res.send('server is running well');
});

app.use('/api/v1/user', userRouter);

app.use((req: Request, res: Response) => {                   // handling the invalid or unknown route
    console.log("invalid route");
    res.status(404).send("OOPS!! 404 page not found");
});

app.use(errorMeddleware);

export default app;
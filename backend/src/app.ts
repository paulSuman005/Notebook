import express, {Request, Response} from 'express';
import morgan from 'morgan';
import userRouter from './router/userRouter';
import errorMeddleware from './middleware/errorMiddleware';

const app = express();


app.use(express.json());    // to parse the incoming request body as JSON
app.use(express.urlencoded({ extended: true })); // to parse URL-encoded data

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
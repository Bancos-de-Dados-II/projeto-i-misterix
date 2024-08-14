import express, { json } from 'express';
import legendRouter from './controller/legendController.js';
import userRouter from './controller/userController.js';
import { authenticateToken } from './middlewares.js';

const app = express();
const port = process.env.PORT;

app.use(json());
app.use('/legends', legendRouter);
app.use('/users', userRouter)

app.get('/auth', authenticateToken, (req, res) => res.sendStatus(200));

app.listen(port, () => console.log('listen on http://localhost:' + port));
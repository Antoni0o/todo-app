import 'express-async-errors';

import cors from 'cors';
import express from 'express';

import { router } from './routes/index.routes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(errorMiddleware);
app.use('/avatars', express.static(path.join(__dirname, '../tmp')))

app.listen(process.env.PORT || 4000, () => {
  console.log('App is runing on port 4000!');
});

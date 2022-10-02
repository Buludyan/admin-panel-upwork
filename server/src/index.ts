import express from 'express';
import cors from 'cors';
import {router} from './Routes/CollegesRoute';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('/colleges', router);
app.use('/details', router);

app.listen(4000, () => {
  console.log('Port working on 4000');
});

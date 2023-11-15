import express from 'express';
import { eventRoutes } from './routes/EventRoute';
import cors from 'cors';
import config from './config/index';
const { httpPort } = config.db;
import helmet from 'helmet';




//SERVER
const app = express();

//MIDDLEWARE
app.use(express.json());
//Helmet middleware for security headers 
app.use(helmet()); 

//CORS
app.use(cors());
//ROUTE
app.use('/api/events',eventRoutes); //importing the route from the routes folder

app.listen(httpPort, () => {
  console.log(`Server is running on port ${httpPort}`);
});
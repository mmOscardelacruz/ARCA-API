import express from 'express';
import { EventsController } from '../controllers/EventController';
export const eventRoutes = express.Router();

eventRoutes.get('/', EventsController.getTrips);

export default eventRoutes;
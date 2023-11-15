import { Request, Response } from "express";
import { eventRepository } from "../repositories/EventRepository";
import { GetEventsOptions } from "../db/interface/OptionEventsInterface";
import { isValidDate } from "../utils/helpers/dateUtils";



export const EventsController = {
  async getTrips(req: Request, res: Response) {
    try {
      // const Token = req.query.Token as string || 'zrtf94Uhw9Hy'; // Valor por defecto
      const FromDate = req.query.FromDate as string;
      const ToDate = req.query.ToDate as string;
      // const Devices = req.query.Devices ? `[${(req.query.Devices as string).split(",").map(device => `"${device.trim()}"`).join(",")}]` : '[]'; 
      // const Drivers = req.query.Drivers ? `[${(req.query.Drivers as string).split(",").map(driver => `"${driver.trim()}"`).join(",")}]` : '[]';
      const Offset = req.query.Offset ? parseInt(req.query.Offset as string) : 0;
      const limite = req.query.limite ? parseInt(req.query.limite as string) : 1;

 
      // Validar que las fechas estén asignadas
      if (!FromDate || !ToDate) {
        return res.status(400).json({ error: "Faltan los parámetros de fecha" });
      }
      // Validar que la fecha inicial no sea mayor a la fecha final
      if (FromDate > ToDate) {
        return res.status(400).json({ error: "La fecha inicial no puede ser mayor a la fecha final" });
      }

     // Validar las fechas
    if (!isValidDate(FromDate, ToDate)) {
      return res.status(400).json({ error: "Intervalo de fechas no válido. Diferencia superior a 1 dia" });
    }

    if(limite < 1){
      return res.status(400).json({ error: "El número de página debe ser mayor a 0" });
    }


      const options: GetEventsOptions = {
        FromDate,
        ToDate,      
        Offset,
        limite,
      };
     
      const Events = await eventRepository.getEvents(options);
      const rowCount = Events.total_rows;
      const data = Events.data;
      // Validar que se hayan encontrado registros
      if(Events.length === 0){
        return res.status(404).json({ error: "No se encontraron registros" });
      }
      const totalRecords = 159600;
      // const limit = 5000;
      const pages = Math.ceil(totalRecords/limite);
      const actualPage = limite;
      // const trips = removeProperty(Events,'rowCount');
      res.json({Total_rows:rowCount,data});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}



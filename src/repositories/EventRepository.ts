import { executeSqlCommand } from "../db";
import { EventRepo, EventResponse, eventsPaginated } from "../db/interface/EventResponseInterface";
import { GetEventsOptions } from "../db/interface/OptionEventsInterface";
import { isValidDate } from "../utils/helpers/dateUtils";


export const eventRepository = {
  async getEvents(options: GetEventsOptions): Promise<any> {
    try {
      const {FromDate,ToDate,limite,Offset} = options;

      if(!isValidDate(FromDate,ToDate)){
        throw new Error('Intervalo de fechas no válido. Diferencia superior a 1 dia')
      }
      const arrayResp = [];
      const query = `SELECT * FROM partitions.get_processed_exceptions_paginated_fn('${FromDate}','${ToDate}',${limite},${Offset});`;
      const quueryArgs = {FromDate,ToDate,limite,Offset};
      const res:any = await executeSqlCommand(query, quueryArgs, true) ;
      const objEvents:eventsPaginated = res.get_processed_exceptions_paginated_fn;
      // const data = arrayData.data;
      // const events = res.map((event: EventRepo) => event.get_processed_exceptions_fn);
      
      // arrayResp.push(arrayData.total_rows,data);
      return objEvents;
      // return data as EventResponse[];

    } catch (error) {
      throw new Error('Error retrieving events')
    }
  }
}
import { DateTime } from "luxon";

export const isValidDate = (fromDate: string, toDate: string): boolean => {
  const format = "yyyy-MM-dd HH:mm:ss";
  const from = DateTime.fromFormat(fromDate, format);
  const to = DateTime.fromFormat(toDate, format);

  // Verificar si la diferencia entre las fechas es mayor a 1 dia 
  const diff = to.diff(from, "days").days;
  return Math.abs(diff) <= 1;
};

export interface EventRepo {
	get_processed_exceptions_fn: eventsPaginated;
}

export interface eventsPaginated {
  total_rows: number;
  data: EventResponse[];
}


export interface EventResponse {
	uo: string;
	num_sap: string;
	num_employee: string;
	driver_name: string;
	event_type: string;
	event_description: string;
	time_start: string;
	time_end: string;
	location: string;
	distance: number;
	duration: string;
}







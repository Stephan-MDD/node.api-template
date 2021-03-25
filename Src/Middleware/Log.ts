import { Request, Response, NextFunction, Errback } from 'express';
import { ServiceResponse } from '../Services';
import { BaseError, ClientError, ServerError } from '../Errors';

export function error() {
	return async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
		// calling next error middleware

		const serviceResponse = new ServiceResponse();

		if (err instanceof ClientError) {
			console.log('Logging ClientError');
			// log errors (database/ winston?)
		} else if (err instanceof ServerError) {
			console.log('Logging ServerError');
			// log errors (database/ winston?)
		} else {
			console.log('Logging DefaultError');
			// log errors (database/ winston?)
		}

		serviceResponse.status = err.status;
		serviceResponse.message = err.message;

		res.locals.serviceResponse = serviceResponse;
		res.locals.error = err;

		next();
	};
}

import { Request, Response, NextFunction, Errback } from 'express';
import { ServiceResponse } from '../Services';
import { BaseError, ServerError, ClientError } from '../Errors';

export function clientErrors() {
	return async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
		// calling next error middleware
		if (err instanceof ServerError) return next(new ServerError(err.status, err.message));

		// log errors (database/ winston?)

		const serviceResponse = new ServiceResponse();
		serviceResponse.status = err.status;
		serviceResponse.message = err.message;

		res.locals.serviceResponse = serviceResponse;
		res.locals.error = err;

		next();
	};
}

export function serverErrors() {
	return async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
		console.log('Logging serverErrors');
		// log errors (database/ winston?)

		const serviceResponse = new ServiceResponse();
		serviceResponse.status = err.status;
		serviceResponse.message = err.message;

		res.locals.serviceResponse = serviceResponse;
		res.locals.error = err;
		next();
	};
}

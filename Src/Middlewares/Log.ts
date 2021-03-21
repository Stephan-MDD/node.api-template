import { Request, Response, NextFunction, Errback } from 'express';
import { ServiceResponse } from '../Services';
import { AuthenticateError } from '../Errors';

// use base error

export function errors() {
	return async (err: AuthenticateError, req: Request, res: Response, next: NextFunction) => {
		console.log('Logging Error');
		// log errors (database/ winston?)

		const serviceResponse = new ServiceResponse();
		serviceResponse.status = err.status;

		res.locals.serviceResponse = serviceResponse;
		res.locals.error = err;
		next();
	};
}

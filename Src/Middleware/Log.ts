import { Request, Response, NextFunction } from 'express';
import { ServiceResponse } from '../Services';
import { BaseError, ClientError, ServerError } from '../Errors';
import { HttpCodes } from '../Enums';

export function error() {
	return async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
		const serviceResponse = new ServiceResponse();

		if (err instanceof ClientError) {
			console.log('Logging ClientError');
			serviceResponse.status = err.status;
			serviceResponse.message = err.message;
			// log errors (database/ winston?)
		} else if (err instanceof ServerError) {
			console.log('Logging ServerError');
			serviceResponse.status = err.status;
			serviceResponse.message = err.message;
			// log errors (database/ winston?)
		} else {
			console.log('Logging DefaultError');
			serviceResponse.status = HttpCodes.InternalServerError;
			serviceResponse.message = err.message; // 'Server Error occurred, see logs for details'
			// log errors (database/ winston?)
			console.log(err);
		}

		res.locals.serviceResponse = serviceResponse;
		res.locals.error = err;

		next();
	};
}

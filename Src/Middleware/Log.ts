/// libraries
import { Response, Request, NextFunction } from 'express';
import { BaseError, ClientError, ServerError } from '../Errors';
import { HttpCodes } from '../Enums';

/// content
export function error() {
	return async (err: BaseError, req: Request, res: Response, next: NextFunction) => {
		if (err instanceof ClientError) {
			console.log('Logging ClientError');
			res.locals.status = err.status;
			res.locals.response = { message: err.message };
			// log errors (database/ winston?)
		} else if (err instanceof ServerError) {
			console.log('Logging ServerError');
			res.locals.status = err.status;
			res.locals.response = { message: err.message };
			// log errors (database/ winston?)
		} else {
			console.log('Logging DefaultError');
			res.locals.status = HttpCodes.InternalServerError;
			res.locals.response = { message: err.message }; // 'Server Error occurred, see logs for details'
			// log errors (database/ winston?)
			console.log(err);
		}

		res.locals.error = err;
		next();
	};
}

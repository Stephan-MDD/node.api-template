import { Request, Response, NextFunction } from 'express';

/** Monitor Middleware
 * Save meta data to database
 * - request
 * - user
 * - system (CPU, RAM, ...)
 * - ect.
 * (Ignore Editor+)
 *
 * Create endpoint to fetch meta data
 * (Editor+ only)
 */

export function request() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// save meta data
		console.log(req.url);
		next();
	};
}

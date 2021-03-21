import * as os from 'os';
import { Request, Response, NextFunction } from 'express';
import { UserRoles, HttpCodes } from '../Enums';

/** Monitor Middleware
 * Save meta data to database
 * - request
 * - user
 * - system (CPU, RAM, ...)
 * - response time
 * - errors thrown
 * - ect.
 * (Ignore Editor+)
 *
 * Create endpoint to fetch meta data
 * (Editor+ only)
 */

export function initiate() {
	return async (req: Request, res: Response, next: NextFunction) => {
		res.locals.entryTime = Date.now();
		next();
	};
}

export function conclude() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// save meta data to database

		if (res.locals.userRole > UserRoles.Default) return next();

		const processTime: number = Date.now() - res.locals.entryTime;
		const url: string = req.url;
		const method: string = req.method;
		const totalMemory: number = os.totalmem();
		const freeMemory: number = os.freemem();
		const CPUs = os.cpus();
		const CPU_Usage = process.cpuUsage();

		console.table({ processTime, url, method, totalMemory, freeMemory /*, CPUs, CPU_Usage*/ });

		const { status, ...response } = res.locals.serviceResponse;

		if (response) res.status(status).json(response);
		else res.send(status || HttpCodes.InternalServerError);
	};
}

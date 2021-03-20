import * as os from 'os';
import { Request, Response, NextFunction } from 'express';
import { UserRoles } from '../Enums';

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
		req.body._entryTime = Date.now();
		next();
	};
}

export function conclude() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// save meta data to database

		if (req.body._userRole > UserRoles.Default) return next();

		const elapsedTime: number = Date.now() - req.body._entryTime;
		// os.cpus()
		console.table({ url: req.url, method: req.method, totalmem: os.totalmem(), freemem: os.freemem(), ...process.cpuUsage(), elapsedTime });
		next();
	};
}

import * as os from 'os';
import { Request, Response, NextFunction } from 'express';
import { UserRoles, HttpCodes } from '../Enums';

export function initiate() {
	return async (req: Request, res: Response, next: NextFunction) => {
		res.locals.entryTime = Date.now();
		next();
	};
}

export function conclude() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// ignores users with role above default
		if (res.locals.userRole > UserRoles.Default) return next();

		// save meta data to database

		// user requesting
		// const userId: number = res.locals.userId;

		// error thrown to middleware
		const errorName: string | null = res.locals.error?.name;

		// error initially thrown
		const initialErrorName: string | null = res.locals.error?.initialName;

		// error message
		const errorMessage: string | undefined = undefined; // res.locals.error?.message;

		// error message
		const errorType: string | undefined = res.locals.error?.type;

		// timestamp for request entry
		const entryTime: number = res.locals.entryTime;

		// process time for request
		const processTime: number = Date.now() - res.locals.entryTime;

		// requested url
		const url: string = req.url;

		// requested http method
		const method: string = req.method;

		// current memory usage
		const memoryUsage: number = os.totalmem() - os.freemem();

		// current CPU usage
		const CPUs = os.cpus();
		const CPU_Usage = process.cpuUsage();

		// log for development
		console.table({ errorName, errorMessage, initialErrorName, errorType, entryTime, processTime, url, method, memoryUsage /*, CPUs, CPU_Usage*/ });

		const { status, ...response } = res.locals.serviceResponse;

		if (response) return res.status(status).json(response);
		return res.json({ a: 'a' });
		// else res.send(status || HttpCodes.InternalServerError);
	};
}

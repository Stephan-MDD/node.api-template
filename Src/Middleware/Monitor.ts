import * as os from 'os';
import { Request, Response, NextFunction } from 'express';
import { UserRoles, HttpCodes } from '../Enums';

import { MonitorService } from '../Services';
import { MonitorDTO } from '../DTOs/Monitor';

export function initiate() {
	return async (req: Request, res: Response, next: NextFunction) => {
		res.locals.entryTime = new Date().toISOString();
		next();
	};
}

export function conclude() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// ignores users with role above default
		if (res.locals.userRole > UserRoles.Default) return next();

		// save meta data to database
		const monitor: MonitorDTO = new MonitorDTO();

		// user requesting
		monitor.userId = res.locals.userId;

		// error thrown to middleware
		monitor.errorName = res.locals.error?.name;

		// error initially thrown
		monitor.initialErrorName = res.locals.error?.initialName; // ATT:: returns object?

		// error message
		monitor.errorMessage = res.locals.error?.message;

		// error message
		monitor.errorType = res.locals.error?.type ?? 'DefaultError';

		// timestamp for request entry
		monitor.entryTime = res.locals.entryTime;

		// process time for request
		monitor.processTime = Date.now() - Date.parse(res.locals.entryTime);

		// requested url
		monitor.url = req.url;

		// requested http method
		monitor.method = req.method;

		// current memory usage
		monitor.memoryUsage = os.totalmem() - os.freemem();

		// // current CPU usage, for later implementation
		// const CPUs = os.cpus();
		// const CPU_Usage = process.cpuUsage();

		// log for development
		console.table(monitor);

		MonitorService.addSingle(monitor);

		const { status, response } = res.locals;

		if (response) return res.status(status).json(response);
		else res.send(status || HttpCodes.InternalServerError);
	};
}

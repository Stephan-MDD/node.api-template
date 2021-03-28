/// libraries
import { Request, Response, NextFunction } from 'express';

export default function Catcher(cb: (req: Request, res: Response) => Promise<void>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await cb(req, res);
		} catch (error) {
			next(error);
		}
		next();
	};
}

/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/// modules
import { HttpCodes, UserRoles } from '../Enums';
import { AuthService, ServiceResponse } from '../Services';
import { ClientError, ServerError } from '../Errors';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const serviceResponse = new ServiceResponse();
	const { username, password } = req.body;

	// att:: get username & password -> can throw 404
	// att:: match passwords  -> can throw 401

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		return next(new ServerError(HttpCodes.InternalServerError));
	}

	const token: string = jwt.sign({ username: req.body.username }, accessTokenSecret);
	serviceResponse.data = { token };
	res.locals.serviceResponse = serviceResponse;
	next();
});

// role restriction by privileges
export function authenticate(userRoles?: UserRoles) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return next(new ClientError(HttpCodes.Unauthorized));
		}

		const token = /Bearer (?<token>.*)/g.exec(authHeader)?.groups?.token;

		if (!token) {
			return next(new ClientError(HttpCodes.Unauthorized));
		}

		const { status, ...response } = await AuthService.authenticate(token, userRoles);

		if (status < 200 || status >= 300) {
			return next(new ClientError(HttpCodes.Unauthorized));
		}

		// applies userId to request object
		res.locals.userId = response.data;

		// att:: set user role for later access
		// res.locals.userRole = response.userRole;
		next();
	};
}

export default { router, route };

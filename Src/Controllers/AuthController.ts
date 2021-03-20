/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/// modules
import { HttpCodes, UserRoles } from '../Enums';
import { AuthService } from '../Services';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const { username, password } = req.body;

	// get username & password -> can throw 404
	// match passwords  -> can throw 401

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(HttpCodes.InternalServerError);

	const token = jwt.sign({ username: req.body.username }, accessTokenSecret);
	res.json({ token });
});

// authentication with jwt
export async function authenticate(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(HttpCodes.Unauthorized);

	const { token } = /Bearer (?<token>.*)/g.exec(authHeader).groups;
	const { status, ...response } = await AuthService.authenticate(token);

	if (response.success) {
		req.body.userId = response.data;
		return next();
	} else {
		return res.status(status).json(response);
	}
}

// role restriction by privileges
export function restrictTo(userRoles: UserRoles) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		if (!authHeader) return res.sendStatus(HttpCodes.Unauthorized);

		const { token } = /Bearer (?<token>.*)/g.exec(authHeader).groups;
		const { status, ...response } = await AuthService.authenticate(token);

		if (response.success) {
			req.body.userId = response.data;

			// att:: validate restriction here...
			// const { status, ...response } = await AuthService.restrictTo(userRoles);

			return next();
		} else {
			return res.status(status).json(response);
		}
	};
}

export default { router, route };

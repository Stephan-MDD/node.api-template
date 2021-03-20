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

	// att:: get username & password -> can throw 404
	// att:: match passwords  -> can throw 401

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(HttpCodes.InternalServerError);

	const token = jwt.sign({ username: req.body.username }, accessTokenSecret);

	// next();
	res.json({ token });
});

// role restriction by privileges
export function authenticate(userRoles?: UserRoles) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		if (!authHeader) return res.sendStatus(HttpCodes.Unauthorized);

		const token = /Bearer (?<token>.*)/g.exec(authHeader)?.groups?.token;

		if (!token) {
			// att:: ServiceResponse ?
			return res.status(HttpCodes.Unauthorized).json({});
		}

		const { status, ...response } = await AuthService.authenticate(token, userRoles);

		if (response.success) {
			// applies userId to request object
			req.body._userId = response.data;

			// att:: set user role for later access
			// req.body._userRole = response.userRole;
			return next();
		} else {
			return res.status(status).json(response);
		}
	};
}

export default { router, route };

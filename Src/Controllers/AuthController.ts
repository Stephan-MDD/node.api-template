/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/// modules
import { HttpCodes, UserRoles } from '../Enums';

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

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(HttpCodes.InternalServerError);

	try {
		const token: string = authHeader.split(' ')[1];
		const decoded: any = jwt.verify(token, accessTokenSecret);
		console.table(decoded); // remove

		if (decoded.username) req.body.username = decoded?.username;
		else return res.sendStatus(HttpCodes.Unauthorized);

		return next();
	} catch (err) {
		res.sendStatus(HttpCodes.Unauthorized);
	}
}

// role restriction by privileges
export function restrict(userRoles: UserRoles) {
	return async (req: Request, res: Response, next: NextFunction) => {
		authenticate(req, res, () => {});
		// user service -> check user privileges | req.body.username

		next();
	};
}

export default { router, route };

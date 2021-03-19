/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// modules
import { HttpCodes } from '../Utilities';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(HttpCodes.InternalServerError);

	// ATT:: encrypt password etc.
	var token = jwt.sign({ username: req.body.username }, accessTokenSecret);
	res.json({ token });
});

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
	res.send('signup');
});

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(HttpCodes.Unauthorized);

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(HttpCodes.InternalServerError);

	try {
		const token: string = authHeader.split(' ')[1];
		const decoded: any = jwt.verify(token, accessTokenSecret);
		console.log('decoded::', decoded);

		if (decoded.username) req.body.username = decoded?.username;
		else return res.sendStatus(HttpCodes.Unauthorized);

		return next();
	} catch (err) {
		res.sendStatus(HttpCodes.Unauthorized);
	}
}

export default { router, route, auth: false };

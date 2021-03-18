/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/signin', (req: Request, res: Response, next: NextFunction) => {
	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(500);

	var token = jwt.sign({ username: req.body.username }, accessTokenSecret);
	res.json({ token });
});

router.post('/signup', (req: Request, res: Response, next: NextFunction) => {
	res.send('signup');
});

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.sendStatus(401);

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;
	if (!accessTokenSecret) return res.status(500);

	try {
		const token: string = authHeader.split(' ')[1];
		const decoded: any = jwt.verify(token, accessTokenSecret);
		console.log('decoded::', decoded);

		if (decoded.username) req.body.username = decoded?.username;
		else return res.sendStatus(401);

		return next();
	} catch (err) {
		res.sendStatus(401);
	}
};

export default { router, route, auth: false };

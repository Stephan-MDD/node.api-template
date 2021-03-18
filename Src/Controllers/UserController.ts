/// libraries
import { Router, Request, Response } from 'express';

/// content
const route: string = '/user';
const router: Router = Router();

router.get('', (req: Request, res: Response) => {
	res.send(req.body.username);
});

export default { router, route, auth: true };

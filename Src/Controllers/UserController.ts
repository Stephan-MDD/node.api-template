/// libraries
import { Router, Request, Response } from 'express';

/// modules
import { authenticate } from './AuthController';

/// content
const route: string = '/user';
const router: Router = Router();

router.get('/', authenticate, async (req: Request, res: Response) => {
	res.send(req.body.username);
});

router.get('/:id', async (req: Request, res: Response) => {
	res.send(req.params.id);
});

export default { router, route, auth: true };

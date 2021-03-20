/// libraries
import { Router, Request, Response } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { authenticate, restrictTo } from './AuthController';
import { UserService } from '../Services';
import { User } from '../Models';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get('/', restrictTo(UserRoles.Editor), async (req: Request, res: Response) => {
	const { status, ...response } = await UserService.getAll();
	res.status(status).json(response);
});

// get user
router.get('/:id', authenticate, async (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	const { status, ...response } = await UserService.get(id);
	res.status(status).json(response);
});

// create user
router.post('/', authenticate, async (req: Request, res: Response) => {
	const user: User = req.body; // att:: apply dto
	const { status, ...response } = await UserService.add(user);
	res.status(status).json(response);
});

// update user
router.put('/:id', authenticate, async (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	const user: User = req.body; // att:: apply dto
	const { status, ...response } = await UserService.update(id, user);
	res.status(status).json(response);
});

// update user
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
	const id: number = Number(req.params.id);
	const { status, ...response } = await UserService.remove(id);
	res.status(status).json(response);
});

export default { router, route };

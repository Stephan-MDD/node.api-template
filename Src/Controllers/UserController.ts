/// libraries
import { Router, Request, Response, NextFunction } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { authenticate } from './AuthController';
import { UserService } from '../Services';
import { User } from '../Models';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get('/', authenticate(UserRoles.Editor), async (req: Request, res: Response, next: NextFunction) => {
	res.locals.serviceResponse = await UserService.getAll();
	next();
});

// get user
router.get('/:id', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	res.locals.serviceResponse = await UserService.get(id);
	next();
});

// create user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const user: User = req.body; // att:: apply dto
	res.locals.serviceResponse = await UserService.add(user);
	next();
});

// update user
router.put('/:id', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	const user: User = req.body; // att:: apply dto
	res.locals.serviceResponse = await UserService.update(id, user);
	next();
});

// update user
router.delete('/:id', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const id: number = Number(req.params.id);
	res.locals.serviceResponse = await UserService.remove(id);
	next();
});

export default { router, route };

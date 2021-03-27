/// libraries
import { Router, Request, Response, NextFunction } from 'express';

/// modules
import { HttpCodes, UserRoles } from '../Enums';
import { Authenticate } from '../Middleware';
import { UserService } from '../Services';
import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get('/', Authenticate(UserRoles.Editor), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userDTOs: UserDTO[] = await UserService.getAll();
		res.locals.response = userDTOs;
		res.locals.status = HttpCodes.Accepted;
	} catch (error) {
		next(error);
	}

	next();
});

// get user
router.get('/:email', Authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const email: string = req.params.email;

	try {
		const userDTO: UserDTO = await UserService.getSingle(email);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	} catch (error) {
		next(error);
	}

	next();
});

// create user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const user: User = req.body; // att:: apply dto

	try {
		const userDTO: UserDTO = await UserService.addSingle(user);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	} catch (error) {
		next(error);
	}

	next();
});

// update user
router.put('/:email', Authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const email: string = req.params.email;
	const user: User = req.body; // att:: apply dto

	try {
		const userDTO: UserDTO = await UserService.updateSingle(email, user);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	} catch (error) {
		next(error);
	}

	next();
});

// delete user
router.delete('/:email', Authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const email: string = req.params.id;

	try {
		await UserService.deleteSingle(email);
		res.locals.status = HttpCodes.Accepted;
	} catch (error) {
		next(error);
	}

	next();
});

export default { router, route };

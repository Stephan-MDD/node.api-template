/// libraries
import { Router, Request, Response, NextFunction } from 'express';

/// modules
import { HttpCodes, UserRoles } from '../Enums';
import { Authenticate, Catcher } from '../Middleware';
import { UserService } from '../Services';
import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get(
	'/',
	Authenticate(UserRoles.Editor),
	Catcher(async (req: Request, res: Response) => {
		const userDTOs: UserDTO[] = await UserService.getAll();
		res.locals.response = userDTOs;
		res.locals.status = HttpCodes.Accepted;
	})
);

// get user
router.get(
	'/:email',
	Authenticate(),
	Catcher(async (req: Request, res: Response) => {
		const email: string = req.params.email;

		const userDTO: UserDTO = await UserService.getSingle(email);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	})
);

// create user
router.post(
	'/',
	Catcher(async (req: Request, res: Response) => {
		const user: User = req.body; // att:: apply dto

		const userDTO: UserDTO = await UserService.addSingle(user);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	})
);

router.put(
	'/:email',
	Authenticate(),
	Catcher(async (req: Request, res: Response) => {
		const email: string = req.params.email;
		const user: User = req.body; // att:: apply dto

		const userDTO: UserDTO = await UserService.updateSingle(email, user);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	})
);

// update user
router.put(
	'/:email',
	Authenticate(),
	Catcher(async (req: Request, res: Response) => {
		const email: string = req.params.email;
		const user: User = req.body; // att:: apply dto

		const userDTO: UserDTO = await UserService.updateSingle(email, user);
		res.locals.response = userDTO;
		res.locals.status = HttpCodes.Accepted;
	})
);

// delete user
router.delete(
	'/:email',
	Authenticate(),
	Catcher(async (req: Request, res: Response) => {
		const email: string = req.params.id;

		await UserService.deleteSingle(email);
		res.locals.status = HttpCodes.Accepted;
	})
);

export default { router, route };

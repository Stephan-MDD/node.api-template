/// libraries
import { Router, Request, Response } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { Authenticate } from '../Middleware';

/// modules
import { HttpCodes } from '../Enums';
import { Exception } from '../Middleware';
import { UserService } from '../Services';
import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
const getAll = async (req: Request, res: Response) => {
	const userDTOs: UserDTO[] = await UserService.getAll();
	res.locals.response = userDTOs;
	res.locals.status = HttpCodes.Accepted;
};

router.get('/', Authenticate(UserRoles.Editor), Exception.catcher(getAll));

// get user
const getSingle = async (req: Request, res: Response) => {
	const email: string = req.params.email;

	const userDTO: UserDTO = await UserService.getSingle(email);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
};

router.get('/:email', Authenticate(), Exception.catcher(getSingle));

// create user
const addSingle = async (req: Request, res: Response) => {
	const user: User = req.body; // att:: apply dto

	const userDTO: UserDTO = await UserService.addSingle(user);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
};

router.post('/', Exception.catcher(addSingle));

// update user
const updateSingle = async (req: Request, res: Response) => {
	const email: string = req.params.email;
	const user: User = req.body; // att:: apply dto

	const userDTO: UserDTO = await UserService.updateSingle(email, user);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
};

router.put('/:email', Authenticate(), Exception.catcher(updateSingle));

// delete user
const deleteSingle = async (req: Request, res: Response) => {
	const email: string = req.params.id;

	await UserService.deleteSingle(email);
	res.locals.status = HttpCodes.Accepted;
};

router.delete('/:email', Authenticate(), Exception.catcher(deleteSingle));

export default { router, route };

/// libraries
import { Request, Response } from 'express';

/// modules
import { HttpCodes } from '../Enums';
import { Exception } from '../Middleware';
import { UserService } from '../Services';
import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';

/// content
export const getAll = Exception.catcher(async (req: Request, res: Response) => {
	const userDTOs: UserDTO[] = await UserService.getAll();
	res.locals.response = userDTOs;
	res.locals.status = HttpCodes.Accepted;
});

export const getSingle = Exception.catcher(async (req: Request, res: Response) => {
	const email: string = req.params.email;

	const userDTO: UserDTO = await UserService.getSingle(email);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
});

export const addSingle = Exception.catcher(async (req: Request, res: Response) => {
	const user: User = req.body; // att:: apply dto

	const userDTO: UserDTO = await UserService.addSingle(user);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
});

export const updateSingle = Exception.catcher(async (req: Request, res: Response) => {
	const email: string = req.params.email;
	const user: User = req.body; // att:: apply dto

	const userDTO: UserDTO = await UserService.updateSingle(email, user);
	res.locals.response = userDTO;
	res.locals.status = HttpCodes.Accepted;
});

export const deleteSingle = Exception.catcher(async (req: Request, res: Response) => {
	const email: string = req.params.id;

	await UserService.deleteSingle(email);
	res.locals.status = HttpCodes.Accepted;
});

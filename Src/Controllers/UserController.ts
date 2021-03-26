/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import { createConnection, Connection } from 'typeorm';

/// modules
import { UserRoles } from '../Enums';
import { authenticate } from './AuthController';
import { ServiceResponse, UserService } from '../Services';
import { User } from '../Entities';

/// content
const route: string = '/user';
const router: Router = Router();

// get all user
router.get('/', authenticate(UserRoles.Editor), async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();

	try {
		const serviceResponse: ServiceResponse = await UserService.getAll();
		res.locals.serviceResponse = serviceResponse;
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	next();
});

// get user
router.get('/:email', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();
	const email: string = req.params.email;

	try {
		const serviceResponse: ServiceResponse = await UserService.getSingle(email);
		res.locals.serviceResponse = serviceResponse;
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	next();
});

// create user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();
	const user: User = req.body; // att:: apply dto

	try {
		const serviceResponse: ServiceResponse = await UserService.addSingle(user);
		res.locals.serviceResponse = serviceResponse;
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	next();
});

// update user
router.put('/:email', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();
	const email: string = req.params.email;
	const user: User = req.body; // att:: apply dto

	try {
		const serviceResponse: ServiceResponse = await UserService.updateSingle(email, user);
		res.locals.serviceResponse = serviceResponse;
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	next();
});

// delete user
router.delete('/:email', authenticate(), async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();
	const email: string = req.params.id;

	try {
		const serviceResponse: ServiceResponse = await UserService.deleteSingle(email);
		res.locals.serviceResponse = serviceResponse;
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	next();
});

export default { router, route };

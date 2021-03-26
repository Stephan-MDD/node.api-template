/// libraries
import { Router, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createConnection, Connection } from 'typeorm';

/// modules
import { UserRoles } from '../Enums';
import { AuthService, ServiceResponse } from '../Services';
import { UserService } from '../Services';
import { ForbiddenError, UnauthorizedError } from '../Errors/ClientErrors';
import { InternalServerError } from '../Errors/ServerErrors';

/// content
const route: string = '/auth';
const router: Router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
	const connection: Connection = await createConnection();

	const serviceResponse = new ServiceResponse();
	const { email, password } = req.body;

	try {
		const userServiceResponse: ServiceResponse = await UserService.getSingle(email);
		const passwordHash: string = userServiceResponse.data?.password;

		const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

		if (!passwordMatch) {
			return next(new ForbiddenError('Invalid Login Credentials'));
		}
	} catch (error) {
		next(error);
	} finally {
		await connection.close();
	}

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		return next(new InternalServerError('No JWT Resource found'));
	}

	const token: string = jwt.sign({ username: req.body.username }, accessTokenSecret);
	serviceResponse.data = { token };
	res.locals.serviceResponse = serviceResponse;
	next();
});

// role restriction by privileges
export function authenticate(userRoles: UserRoles = UserRoles.Default) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return next(new UnauthorizedError('No Authentication Header Found'));
		}

		const token = /Bearer (?<token>.*)/g.exec(authHeader)?.groups?.token;

		if (!token) {
			return next(new UnauthorizedError('Invalid Authentication Header Found'));
		}

		try {
			const { status, ...response } = await AuthService.authenticate(token, userRoles);
			res.locals.userId = response.data;
		} catch (error) {
			return next(new UnauthorizedError('Invalid Authentication Header Found', error.name));
		}

		// applies userId to request object

		// att:: set user role for later access
		// res.locals.userRole = response.userRole;
		next();
	};
}

export default { router, route };

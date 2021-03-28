/// libraries
import { Request, Response } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { AuthService } from '../Services';
import { UnauthorizedError } from '../Errors/ClientErrors';
import { Exception } from '.';

export default function authenticate(userRoles: UserRoles = UserRoles.Default) {
	return Exception.catcher(async (req: Request, res: Response) => {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new UnauthorizedError('No Authentication Header Found');
		}

		const token = /Bearer (?<token>.*)/g.exec(authHeader)?.groups?.token;

		if (!token) {
			throw new UnauthorizedError('Invalid Authentication Header Found');
		}

		const { userId, userRole } = await AuthService.authenticate(token, userRoles);
		res.locals.userId = userId;
		res.locals.userRole = userRole;

		// applies userId to request object

		// att:: set user role for later access
		// res.locals.userRole = response.userRole;
	});
}

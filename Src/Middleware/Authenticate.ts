/// libraries
import { Request, Response, NextFunction } from 'express';

/// modules
import { UserRoles } from '../Enums';
import { AuthService } from '../Services';
import { UnauthorizedError } from '../Errors/ClientErrors';

export default function authenticate(userRoles: UserRoles = UserRoles.Default) {
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
			const { userId, userRole } = await AuthService.authenticate(token, userRoles);
			res.locals.userId = userId;
			res.locals.userRole = userRole;
		} catch (error) {
			return next(error);
		}

		// applies userId to request object

		// att:: set user role for later access
		// res.locals.userRole = response.userRole;
		next();
	};
}

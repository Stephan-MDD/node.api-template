/// libraries
import * as jwt from 'jsonwebtoken';

/// modules
import { UserService } from '.';
import { UserRoles } from '../Enums';
import { InternalServerError } from '../Errors/ServerErrors';
import { UnauthorizedError } from '../Errors/ClientErrors';
import { UserDTO } from '../DTOs/User';

export async function authenticate(token: string, restrictTo?: UserRoles): Promise<any> {
	const authentication: { userId?: string; userRole?: UserRoles } = {};

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		throw new InternalServerError('No JWT Resource found');
	}

	try {
		const decoded: any = jwt.verify(token, accessTokenSecret);

		if (decoded.email === undefined) {
			// throw error
		}

		if (decoded.iat + 1 /*env value*/ < Date.now()) {
			// throw error
		}

		authentication.userId = decoded.email;

		console.log('decoded', decoded);
	} catch (error) {
		throw new UnauthorizedError('Invalid JWT', error.name);
	}

	if (authentication.userId && restrictTo != null) {
		// const user: UserDTO = await UserService.getSingle(authentication.userId);
		//if (user.role) {}
		// att:: validate restriction here...
		/** handle user roles
		 * - banned -> return forbidden
		 * - default -> return next()
		 * - editor -> return next()
		 * - admin -> return next()
		 */
	}

	// response.data.userRole = ?

	return authentication;
}

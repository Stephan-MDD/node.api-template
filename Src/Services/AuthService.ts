/// libraries
import * as jwt from 'jsonwebtoken';

/// modules
import ServiceResponse from './ServiceResponse';
import { UserRoles } from '../Enums';
import { InternalServerError } from '../Errors/ServerErrors';
import { UnauthorizedError } from '../Errors/ClientErrors';

export async function authenticate(token: string, restrictTo?: UserRoles): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	response.data = { userId: null, userRole: null };

	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		throw new InternalServerError('No JWT Resource found');
	}

	if (restrictTo != null) {
		// att:: validate restriction here...
		/** handle user roles
		 * - banned -> return forbidden
		 * - default -> return next()
		 * - editor -> return next()
		 * - admin -> return next()
		 */
	}

	// response.data.userRole = ?

	try {
		const decoded: any = jwt.verify(token, accessTokenSecret);
		response.data.userId = decoded;
	} catch (error) {
		throw new UnauthorizedError('Invalid JWT', error);
	}

	return response;
}

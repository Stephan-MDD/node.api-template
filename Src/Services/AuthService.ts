/// libraries
import * as jwt from 'jsonwebtoken';

/// modules
import ServiceResponse from './ServiceResponse';
import { HttpCodes, UserRoles } from '../Enums';

export async function authenticate(token: string, restrictTo?: UserRoles): Promise<ServiceResponse<{ userId: string; userRole: UserRoles }>> {
	const response = new ServiceResponse<{ userId: string; userRole: UserRoles }>();
	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		response.success = false;
		response.status = HttpCodes.InternalServerError;
		return response;
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
	} catch (err) {
		response.success = false;
		response.status = HttpCodes.Unauthorized;
	}

	return response;
}

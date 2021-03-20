/// libraries
import * as jwt from 'jsonwebtoken';

/// modules
import ServiceResponse from './ServiceResponse';
import { HttpCodes, UserRoles } from '../Enums';

export async function authenticate(token: string, userRoles?: UserRoles): Promise<ServiceResponse<string>> {
	const response = new ServiceResponse<string>();
	const accessTokenSecret: string | undefined = process.env.JWT_SECRET;

	if (!accessTokenSecret) {
		response.success = false;
		response.status = HttpCodes.InternalServerError;
		return response;
	}

	if (userRoles != null) {
		// att:: validate restriction here...
		/** handle user roles
		 * - banned -> return forbidden
		 * - default -> return next()
		 * - editor -> return next()
		 * - admin -> return next()
		 */
	}

	try {
		const decoded: any = jwt.verify(token, accessTokenSecret);
		response.data = decoded;
	} catch (err) {
		response.success = false;
		response.status = HttpCodes.Unauthorized;
	}

	return response;
}

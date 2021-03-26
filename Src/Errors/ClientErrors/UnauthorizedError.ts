import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class UnauthorizedError extends ClientError {
	constructor(message: string, initialError?: string) {
		super(HttpCodes.Unauthorized, message, initialError);

		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}
}

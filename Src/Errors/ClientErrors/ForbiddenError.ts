import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class ForbiddenError extends ClientError {
	constructor(message: string, initialError?: string) {
		super(HttpCodes.Forbidden, message, initialError);

		Object.setPrototypeOf(this, ForbiddenError.prototype);
	}
}

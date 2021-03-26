import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class ConflictError extends ClientError {
	constructor(message: string, initialError?: string) {
		super(HttpCodes.Conflict, message, initialError);

		Object.setPrototypeOf(this, ConflictError.prototype);
	}
}

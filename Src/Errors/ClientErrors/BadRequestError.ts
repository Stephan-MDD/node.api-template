import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class BadRequestError extends ClientError {
	constructor(message: string, initialError?: string) {
		super(HttpCodes.BadRequest, message, initialError);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

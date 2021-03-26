import { ServerError } from './';
import { HttpCodes } from '../../Enums';

export default class InternalServerError extends ServerError {
	constructor(message: string, initialError?: string) {
		super(HttpCodes.NotFound, message, initialError);

		Object.setPrototypeOf(this, InternalServerError.prototype);
	}
}

import { ServerError } from './';
import { HttpCodes } from '../../Enums';

export default class InternalServerError extends ServerError {
	name: string;

	constructor(message: string, initialError?: string) {
		super(HttpCodes.NotFound, message, initialError);

		Object.setPrototypeOf(this, InternalServerError.prototype);
		this.name = this.constructor.name;
	}
}

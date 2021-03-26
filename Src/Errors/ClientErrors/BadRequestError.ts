import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class BadRequestError extends ClientError {
	name: string;

	constructor(message: string, initialError?: string) {
		super(HttpCodes.BadRequest, message, initialError);

		Object.setPrototypeOf(this, BadRequestError.prototype);
		this.name = this.constructor.name;
	}
}

import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class BadRequestError extends ClientError {
	name: string;

	constructor(message: string, initialName?: string) {
		super(HttpCodes.BadRequest, message, initialName);

		Object.setPrototypeOf(this, BadRequestError.prototype);
		this.name = this.constructor.name;
	}
}

import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class NotFoundError extends ClientError {
	name: string;

	constructor(message: string, initialError?: string) {
		super(HttpCodes.NotFound, message, initialError);

		Object.setPrototypeOf(this, NotFoundError.prototype);
		this.name = this.constructor.name;
	}
}

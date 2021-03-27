import { ServerError } from './';
import { HttpCodes } from '../../Enums';

export default class InternalServerError extends ServerError {
	name: string;

	constructor(message: string, initialName?: string) {
		super(HttpCodes.NotFound, message, initialName);

		Object.setPrototypeOf(this, InternalServerError.prototype);
		this.name = this.constructor.name;
	}
}

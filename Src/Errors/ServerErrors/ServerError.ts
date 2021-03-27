import { BaseError } from '..';
import { HttpCodes } from '../../Enums';

export default class ServerError extends BaseError {
	type: string;

	constructor(status: HttpCodes, message: string, initialName?: string) {
		super(status, message, initialName);

		Object.setPrototypeOf(this, ServerError.prototype);
		this.type = this.constructor.name;
	}
}

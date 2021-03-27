import { BaseError } from '..';
import { HttpCodes } from '../../Enums';

export default class ClientError extends BaseError {
	type: string;

	constructor(status: HttpCodes, message: string, initialName?: string) {
		super(status, message, initialName);

		Object.setPrototypeOf(this, ClientError.prototype);
		this.type = this.constructor.name;
	}
}

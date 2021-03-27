import { ClientError } from './';
import { HttpCodes } from '../../Enums';

export default class ForbiddenError extends ClientError {
	name: string;

	constructor(message: string, initialName?: string) {
		super(HttpCodes.Forbidden, message, initialName);

		Object.setPrototypeOf(this, ForbiddenError.prototype);
		this.name = this.constructor.name;
	}
}

import { HttpCodes } from '../Enums';

export default class BaseError extends Error {
	status: HttpCodes;

	constructor(status: HttpCodes, message?: string) {
		super(message);
		this.status = status;
	}
}

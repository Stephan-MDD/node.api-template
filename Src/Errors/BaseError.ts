import { HttpCodes } from '../Enums';

export default class BaseError extends Error {
	status: HttpCodes;
	type: string;

	constructor(status: HttpCodes, message?: string) {
		super(message);
		this.status = status;
	}

	is(type: string): boolean {
		return type === this.type;
	}
}

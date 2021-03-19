import { Request } from 'express';

export default class BaseError extends Error {
	constructor(...errorArgs: [string, number, any, any]) {
		super(errorArgs[0]);

		// handle log -> request
	}
}

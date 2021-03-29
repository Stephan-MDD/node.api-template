import express from 'express';
import { HttpCodes, UserRoles } from '../Enums';
import { BaseError } from '../Errors';

declare module 'express' {
	export interface Response {
		locals: {
			status: HttpCodes;
			response?: any;
			error?: BaseError;
			entryTime: string;
			userRole: UserRoles;
			userId: string;
		};
	}
}

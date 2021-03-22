import ServiceResponse from './ServiceResponse';
import { User } from '../Models';

/** Setup typeORM
 * apply to services
 */

export async function getAll(): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = { name: 'marc', password: 'pass123', username: 'marc@mail.io' };
	response.data = [user];
	return response;
}

export async function getSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = { name: 'marc', password: 'pass123', username: 'marc@mail.io' };
	response.data = user;
	return response;
}

export async function addSingle(user: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

export async function updateSingle(id: number, user: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

export async function deleteSingle(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

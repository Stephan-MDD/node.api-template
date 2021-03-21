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

export async function get(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = { name: 'marc', password: 'pass123', username: 'marc@mail.io' };
	response.data = user;
	return response;
}

export async function add(user: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

export async function update(id: number, user: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

export async function remove(id: number): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	return response;
}

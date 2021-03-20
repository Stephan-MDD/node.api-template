import ServiceResponse from './ServiceResponse';
import { User } from '../Models';

export async function getAll(): Promise<ServiceResponse<User[]>> {
	const response = new ServiceResponse<User[]>();
	const user: User = { name: 'marc', password: 'pass123', username: 'marc@mail.io' };
	response.data = [user];
	return response;
}

export async function get(id: number): Promise<ServiceResponse<User>> {
	const response = new ServiceResponse<User>();
	const user: User = { name: 'marc', password: 'pass123', username: 'marc@mail.io' };
	response.data = user;
	return response;
}

export async function add(user: User): Promise<ServiceResponse<User>> {
	const response = new ServiceResponse<User>();
	return response;
}

export async function update(id: number, user: User): Promise<ServiceResponse<void>> {
	const response = new ServiceResponse<void>();
	return response;
}

export async function remove(id: number): Promise<ServiceResponse<void>> {
	const response = new ServiceResponse<void>();
	return response;
}

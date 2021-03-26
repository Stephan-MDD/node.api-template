import bcrypt from 'bcrypt';

import ServiceResponse from './ServiceResponse';
import { User } from '../Entities';
import { HttpCodes } from '../Enums';
import { UserDTO } from '../DTOs/User';
import { BadRequestError, NotFoundError } from '../Errors/ClientErrors';

export async function getAll(): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const allUsers: User[] = await User.find();

	response.data = allUsers.map((user) => new UserDTO(user));
	return response;
}

export async function getSingle(email: string): Promise<ServiceResponse> {
	const response = new ServiceResponse();

	try {
		const user: User | undefined = await User.findOne({ email });

		// user not found
		if (user === undefined) {
			throw new NotFoundError(`Could not find user with id: ${email}`);
		}

		response.data = user;

		return response;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function addSingle(userNew: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User = new User();

	const salt: number = Number(process.env.BCRYPT_SALT);
	const passwordHash = await bcrypt.hash(userNew.password, salt);

	user.email = userNew.email;
	user.password = passwordHash;

	user.firstName = userNew.firstName;
	user.lastName = userNew.lastName;
	user.age = userNew.age;

	try {
		await user.save();
	} catch (error) {
		throw new BadRequestError(error.message, error.name);
	}

	response.data = new UserDTO(user);
	response.status = HttpCodes.Created;

	return response;
}

export async function updateSingle(email: string, userUpdate: User): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne({ email });

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	// add bcrypt for password
	if (userUpdate.firstName) user.firstName = userUpdate.firstName;
	if (userUpdate.lastName) user.lastName = userUpdate.lastName;
	if (userUpdate.age) user.age = userUpdate.age;
	if (userUpdate.password) user.password = userUpdate.password;
	if (userUpdate.role) user.role = userUpdate.role;

	await user.save();
	response.data = new UserDTO(user);

	return response;
}

export async function deleteSingle(email: string): Promise<ServiceResponse> {
	const response = new ServiceResponse();
	const user: User | undefined = await User.findOne({ email });

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	await user.remove();
	response.status = HttpCodes.Accepted;

	return response;
}

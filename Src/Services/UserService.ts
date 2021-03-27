import bcrypt from 'bcrypt';

import { User } from '../Entities';
import { UserDTO } from '../DTOs/User';
import { BadRequestError, NotFoundError } from '../Errors/ClientErrors';

export async function getAll(): Promise<UserDTO[]> {
	const allUsers: User[] = await User.find();
	return allUsers.map((user) => new UserDTO(user));
}

export async function getSingle(email: string): Promise<UserDTO> {
	try {
		const user: User | undefined = await User.findOne({ email });

		// user not found
		if (user === undefined) {
			throw new NotFoundError(`Could not find user with id: ${email}`);
		}

		return new UserDTO(user);
	} catch (error) {
		throw error;
	}
}

export async function addSingle(userNew: User): Promise<UserDTO> {
	const salt: number = Number(process.env.BCRYPT_SALT);
	const passwordHash = await bcrypt.hash(userNew.password, salt);

	const user: User = new User();
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

	return new UserDTO(user);
}

export async function updateSingle(email: string, userUpdate: User): Promise<UserDTO> {
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
	return new UserDTO(user);
}

export async function deleteSingle(email: string): Promise<void> {
	const user: User | undefined = await User.findOne({ email });

	// user not found
	if (user === undefined) {
		throw new NotFoundError(`Could not find user with id: ${email}`);
	}

	await user.remove();
}

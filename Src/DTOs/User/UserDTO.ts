import { User } from '../../Entities';
import { UserRoles } from '../../Enums';

export default class UserDTO {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	age: number;
	role: UserRoles;

	constructor(user: User) {
		this.email = user.email;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.age = user.age;
		this.role = user.role;
		this.password = user.password;
	}
}

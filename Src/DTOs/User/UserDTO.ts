import { User } from '../../Entities';

export default class UserDTO {
	email: string;
	firstName: string;
	lastName: string;
	age: number;

	constructor(user: User) {
		this.email = user.email;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.age = user.age;
	}
}

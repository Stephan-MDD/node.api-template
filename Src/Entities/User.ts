import { Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

import { UserRoles } from '../Enums';

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn()
	@Index({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;

	@Column({
		type: 'enum',
		enum: UserRoles,
		default: UserRoles.Default,
	})
	role: UserRoles;
}

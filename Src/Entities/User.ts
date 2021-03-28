import { Entity, Column, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { string } from 'yargs';
import { UserRoles } from '../Enums';

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryColumn('text')
	@Index({ unique: true })
	email: string;

	@Column('text')
	password: string;

	@Column('text')
	firstName: string;

	@Column('text')
	lastName: string;

	@Column('integer')
	age: number;

	@Column({
		type: 'enum',
		enum: UserRoles,
		default: UserRoles.Default,
	})
	role: UserRoles;
}

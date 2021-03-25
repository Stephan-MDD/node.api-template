import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	/*
	@Column()
	fistName: string;

	@Column()
	lastName: string;

	@Column()
	age: number;
	*/

	@Column()
	name: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;
}

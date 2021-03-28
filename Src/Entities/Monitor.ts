import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Monitor extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number; // user reference?

	@Column()
	initialErrorName: string;

	@Column()
	errorMessage: string;

	@Column()
	errorType: string;

	@Column()
	entryTime: number; // Date?

	@Column()
	processTime: number;

	@Column()
	url: string;

	@Column()
	method: string;

	@Column()
	memoryUsage: number;

	// CPUs = os.cpus();
	// CPU_Usage = process.cpuUsage();
}
